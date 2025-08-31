package model

import (
	"errors"
	"fmt"
	"server/utils"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type PackageStatus string

const (
	StatusWaiting    PackageStatus = "WAITING"
	StatusPicked     PackageStatus = "PICKED"
	StatusHandedOver PackageStatus = "HANDED_OVER"
	StatusExpired    PackageStatus = "EXPIRED"
)

type Package struct {
	ID        uuid.UUID     `db:"id" json:"id"`
	PackageID string        `db:"package_id" json:"package_id,omitempty"`
	OrderRef  string        `db:"order_ref" json:"order_ref"`
	Driver    *string       `db:"driver" json:"driver,omitempty"`
	Status    PackageStatus `db:"status" json:"status"`

	CreatedAt  time.Time `db:"created_at" json:"created_at"`
	CreatedBy  string    `db:"created_by" json:"created_by"`
	ModifiedAt time.Time `db:"modified_at" json:"modified_at"`
	ModifiedBy string    `db:"modified_by" json:"modified_by"`
}

type PackageTotals struct {
	TOTAL       int `db:"total"`
	WAITING     int `db:"waiting"`
	PICKED      int `db:"picked"`
	HANDED_OVER int `db:"handed_over"`
	EXPIRED     int `db:"expired"`
}

type PackageWithTotals struct {
	Packages   []Package     `json:"packages"`
	Aggregates PackageTotals `json:"aggregates"`
}

type PackageModel struct {
	DB *sqlx.DB
}

var (
	ErrInvalidTransition = errors.New("invalid status transition")
	ErrAlreadyFinal      = errors.New("package already in a final state")
)

func (m *PackageModel) GetAll(status string, limit, offset int) (PackageWithTotals, int, error) {
	var result PackageWithTotals
	args := []any{}

	query := "SELECT * FROM packages"
	if status != "" {
		query += " WHERE status = $1"
		args = append(args, status)
	}
	query += " ORDER BY created_at DESC"

	if status != "" {
		query += " LIMIT $2 OFFSET $3"
		args = append(args, limit, offset)
	} else {
		query += " LIMIT $1 OFFSET $2"
		args = append(args, limit, offset)
	}

	if err := m.DB.Select(&result.Packages, query, args...); err != nil {
		return result, 0, err
	}

	var total int
	countQuery := "SELECT COUNT(*) FROM packages"
	countArgs := []any{}
	if status != "" {
		countQuery += " WHERE status = $1"
		countArgs = append(countArgs, status)
	}
	if err := m.DB.Get(&total, countQuery, countArgs...); err != nil {
		return result, 0, err
	}

	totalQuery := `
		SELECT
			COUNT(*) AS total,
			COUNT(*) FILTER (WHERE status='WAITING') AS waiting,
			COUNT(*) FILTER (WHERE status='PICKED') AS picked,
			COUNT(*) FILTER (WHERE status='HANDED_OVER') AS handed_over,
			COUNT(*) FILTER (WHERE status='EXPIRED') AS expired
		FROM packages
	`
	if status != "" {
		totalQuery += " WHERE status = $1"
		if err := m.DB.Get(&result.Aggregates, totalQuery, status); err != nil {
			return result, 0, err
		}
	} else {
		if err := m.DB.Get(&result.Aggregates, totalQuery); err != nil {
			return result, 0, err
		}
	}

	return result, total, nil
}

func (m *PackageModel) GetByID(id uuid.UUID) (*Package, error) {
	var pkg Package
	query := "SELECT * FROM packages WHERE id = $1"
	err := m.DB.Get(&pkg, query, id)
	if err != nil {
		return nil, err
	}
	return &pkg, nil
}

func (m *PackageModel) Create(pkg *Package) error {
	pkg.CreatedAt = time.Now()
	pkg.ModifiedAt = time.Now()
	pkg.PackageID = utils.GeneratePackageID()

	query := `
		INSERT INTO packages (
			package_id,
			order_ref,
			driver,
			created_at,
			created_by,
			modified_at,
			modified_by
		)
		VALUES (
			:package_id,
			:order_ref,
			:driver,
			:created_at,
			:created_by,
			:modified_at,
			:modified_by
		)
		RETURNING *
	`

	stmt, err := m.DB.PrepareNamed(query)
	if err != nil {
		return err
	}

	return stmt.Get(pkg, pkg)
}

func (m *PackageModel) UpdateStatus(id uuid.UUID, newStatus PackageStatus) (*Package, error) {
	var pkg Package
	tx, err := m.DB.Beginx()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	if err := tx.Get(&pkg, "SELECT * FROM packages WHERE id=$1 FOR UPDATE", id); err != nil {
		return nil, err
	}

	valid := false
	switch pkg.Status {
	case StatusWaiting:
		valid = (newStatus == StatusPicked)
	case StatusPicked:
		valid = (newStatus == StatusHandedOver)
	case StatusHandedOver, StatusExpired:
		return nil, fmt.Errorf("%w: package already %s", ErrInvalidTransition, pkg.Status)
	}

	if !valid {
		return nil, fmt.Errorf("%w: %s → %s", ErrInvalidTransition, pkg.Status, newStatus)
	}

	pkg.Status = newStatus
	pkg.ModifiedAt = time.Now()
	if _, err := tx.Exec(`
        UPDATE packages
        SET status=$1, modified_at=$2
        WHERE id=$3
    `, pkg.Status, pkg.ModifiedAt, id); err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &pkg, nil
}

func (m *PackageModel) ExpireOldPackages(duration time.Duration) error {
	query := `
		UPDATE packages
		SET status = 'EXPIRED'
		WHERE status = 'WAITING'
		AND created_at <= NOW() - $1::interval
	`
	_, err := m.DB.Exec(query, duration.String())
	return err
}
