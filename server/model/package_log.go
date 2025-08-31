package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type PackageOption struct {
	ID       uuid.UUID `db:"package.id" json:"id"`
	OrderRef string    `db:"package.order_ref" json:"order_ref"`
	Status   string    `db:"package.status" json:"status"`
}

type PackageLogWithPackage struct {
	ID        uuid.UUID `db:"id" json:"id"`
	PackageID string    `db:"package_id" json:"-"`
	OrderRef  string    `db:"order_ref" json:"order_ref"`
	Status    string    `db:"status" json:"status"`
	OldStatus string    `db:"old_status" json:"old_status"`
	NewStatus string    `db:"new_status" json:"new_status"`
	ChangedAt time.Time `db:"changed_at" json:"changed_at"`
	ChangedBy *string   `db:"changed_by,omitempty" json:"changed_by,omitempty"`
	Note      *string   `db:"note,omitempty" json:"note,omitempty"`
}

type PackageLogModel struct {
	DB *sqlx.DB
}

func (m *PackageLogModel) GetAll() ([]PackageLogWithPackage, error) {
	var logs []PackageLogWithPackage
	query := `
		SELECT
			pl.id,
			pl.old_status,
			pl.new_status,
			pl.changed_at,
			pl.changed_by,
			pl.note,
			p.package_id AS package_id,
			p.order_ref AS order_ref,
			p.status AS status
		FROM package_logs pl
		JOIN packages p ON pl.package_id = p.id
		ORDER BY pl.changed_at DESC;
	`
	err := m.DB.Select(&logs, query)
	return logs, err
}
