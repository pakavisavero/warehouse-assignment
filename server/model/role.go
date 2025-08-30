package model

import (
	"time"

	"github.com/google/uuid"
)

type Role struct {
	ID          uuid.UUID `db:"id" json:"id"`
	RoleName    string    `db:"role_name" json:"role_name"`
	Description string    `db:"description" json:"description"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	CreatedBy   string    `db:"created_by" json:"created_by"`
	ModifiedAt  time.Time `db:"modified_at" json:"modified_at"`
	ModifiedBy  string    `db:"modified_by" json:"modified_by"`
}
