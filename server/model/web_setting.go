package model

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
)

type Period string

const (
	Minutes Period = "minutes"
	Hours   Period = "hours"
	Days    Period = "days"
)

type WebSetting struct {
	ID        int       `db:"id" json:"id"`
	Period    Period    `db:"period" json:"period"`
	Time      int       `db:"time" json:"time"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

type WebSettingModel struct {
	DB *sqlx.DB
}

func (m *WebSettingModel) CreateOrUpdate(setting *WebSetting) error {
	var exists bool
	err := m.DB.Get(&exists, "SELECT EXISTS(SELECT 1 FROM web_setting WHERE id = 1)")
	if err != nil {
		return err
	}

	if exists {
		query := `
			UPDATE web_setting
			SET period = :period,
			    time = :time,
			    updated_at = NOW()
			WHERE id = 1
			RETURNING *
		`
		stmt, err := m.DB.PrepareNamed(query)
		if err != nil {
			return err
		}
		return stmt.Get(setting, setting)
	} else {
		query := `
			INSERT INTO web_setting (id, period, time, created_at, updated_at)
			VALUES (1, :period, :time, NOW(), NOW())
			RETURNING *
		`
		stmt, err := m.DB.PrepareNamed(query)
		if err != nil {
			return err
		}
		return stmt.Get(setting, setting)
	}
}

func (m *WebSettingModel) Get() (*WebSetting, error) {
	var setting WebSetting
	err := m.DB.Get(&setting, "SELECT * FROM web_setting WHERE id = 1 LIMIT 1")
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &setting, nil
}

func (m *PackageModel) GetExpiryDuration() (time.Duration, error) {
	query := `
		SELECT period, time
		FROM web_setting
		ORDER BY id DESC
		LIMIT 1
	`

	var period string
	var value int
	err := m.DB.QueryRow(query).Scan(&period, &value)
	if err != nil {
		return 0, err
	}

	switch period {
	case "minutes":
		return time.Duration(value) * time.Minute, nil
	case "hours":
		return time.Duration(value) * time.Hour, nil
	case "days":
		return time.Duration(value) * 24 * time.Hour, nil
	default:
		return 0, fmt.Errorf("invalid period: %s", period)
	}
}
