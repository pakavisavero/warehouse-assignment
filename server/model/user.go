package model

import (
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID           uuid.UUID `db:"id" json:"id"`
	Username     string    `db:"username" json:"username"`
	PasswordHash string    `db:"password_hash" json:"-"`
	RoleID       *string   `db:"role_id" json:"role_id,omitempty"`

	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	CreatedBy  *string   `db:"created_by" json:"created_by,omitempty"`
	ModifiedAt time.Time `db:"modified_at" json:"modified_at"`
	ModifiedBy *string   `db:"modified_by" json:"modified_by,omitempty"`
}

type UserModel struct {
	DB *sqlx.DB
}

func (m *UserModel) Authenticate(username, password string) (*User, error) {
	var user User

	err := m.DB.Get(&user, `
        SELECT id, username, password_hash 
        FROM users 
        WHERE username=$1`,
		username,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("invalid username or password")
		}
		return nil, errors.New("internal server error")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return nil, errors.New("invalid username or password")
	}

	_, err = m.DB.Exec(
		`INSERT INTO logic_active_user(user_id) VALUES($1) ON CONFLICT DO NOTHING`,
		user.ID,
	)
	if err != nil {
		return nil, errors.New("internal server error")
	}

	return &user, nil
}

func (m *UserModel) Logout(userID string) error {
	_, err := m.DB.Exec(`DELETE FROM logic_active_user WHERE user_id=$1`, userID)
	return err
}

func (m *UserModel) IsActive(userID string) bool {
	var exists bool
	_ = m.DB.QueryRow(`SELECT EXISTS(SELECT 1 FROM logic_active_user WHERE user_id=$1)`, userID).Scan(&exists)
	return exists
}
