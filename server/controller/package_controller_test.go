package controller

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"server/model"
	"strings"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
)

func setupMockDB(t *testing.T) (*model.PackageModel, sqlmock.Sqlmock, func()) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("Failed to open mock db: %v", err)
	}

	sqlxDB := sqlx.NewDb(db, "postgres")

	packageModel := &model.PackageModel{DB: sqlxDB}
	return packageModel, mock, func() { db.Close() }
}

func TestGetByID_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)
	packageModel, mock, cleanup := setupMockDB(t)
	defer cleanup()

	id := uuid.New()
	rows := sqlmock.NewRows([]string{"id", "package_id", "order_ref", "status"}).
		AddRow(id, "PKG001", "ORD001", "WAITING")

	mock.ExpectQuery("SELECT \\* FROM packages WHERE id = \\$1").
		WithArgs(id).
		WillReturnRows(rows)

	controller := &PackageController{Model: packageModel}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{{Key: "id", Value: id.String()}}

	controller.GetByID(c)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "Package fetched successfully")
}

func TestGetByID_InvalidUUID(t *testing.T) {
	gin.SetMode(gin.TestMode)
	controller := &PackageController{}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{{Key: "id", Value: "invalid-uuid"}}

	controller.GetByID(c)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "invalid UUID")
}

func TestUpdateStatus_InvalidTransition(t *testing.T) {
	gin.SetMode(gin.TestMode)
	packageModel, mock, cleanup := setupMockDB(t)
	defer cleanup()

	id := uuid.New()
	mock.ExpectBegin()
	mock.ExpectQuery("SELECT \\* FROM packages WHERE id=\\$1 FOR UPDATE").
		WithArgs(id).
		WillReturnError(errors.New("not found"))
	mock.ExpectRollback()

	controller := &PackageController{Model: packageModel}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Params = gin.Params{{Key: "id", Value: id.String()}}
	c.Request = httptest.NewRequest(http.MethodPatch, "/", strings.NewReader(`{"status":"PICKED"}`))
	c.Request.Header.Set("Content-Type", "application/json")

	controller.UpdateStatus(c)
	assert.Equal(t, http.StatusInternalServerError, w.Code)
}

func TestExpireOldPackages(t *testing.T) {
	packageModel, mock, cleanup := setupMockDB(t)
	defer cleanup()

	mock.ExpectExec("WITH expired AS").
		WithArgs("1h0m0s").
		WillReturnResult(sqlmock.NewResult(0, 1))

	err := packageModel.ExpireOldPackages(time.Hour)
	assert.NoError(t, err)
}
