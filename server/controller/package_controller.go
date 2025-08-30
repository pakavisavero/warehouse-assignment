package controller

import (
	"net/http"
	"server/model"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type PackageController struct {
	Model *model.PackageModel
}

type Response struct {
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

func (pc *PackageController) GetAll(c *gin.Context) {
	status := c.Query("status")

	limitStr := c.DefaultQuery("limit", "10")
	offsetStr := c.DefaultQuery("offset", "0")

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}
	offset, err := strconv.Atoi(offsetStr)
	if err != nil || offset < 0 {
		offset = 0
	}

	packages, err := pc.Model.GetAll(status, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, Response{Message: "Packages fetched successfully", Data: packages})
}

func (pc *PackageController) GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid UUID"})
		return
	}

	pkg, err := pc.Model.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, Response{Message: "Package not found"})
		return
	}
	c.JSON(http.StatusOK, Response{Message: "Package fetched successfully", Data: pkg})
}

func (pc *PackageController) Create(c *gin.Context) {
	var pkg model.Package
	if err := c.ShouldBindJSON(&pkg); err != nil {
		c.JSON(http.StatusBadRequest, Response{Message: err.Error()})
		return
	}

	if err := pc.Model.Create(&pkg); err != nil {
		c.JSON(http.StatusInternalServerError, Response{Message: err.Error()})
		return
	}
	c.JSON(http.StatusCreated, Response{Message: "Package created successfully", Data: pkg})
}

func (pc *PackageController) UpdateStatus(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid UUID"})
		return
	}

	pkg, err := pc.Model.UpdateStatus(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, Response{
		Message: "Package status updated",
		Data:    pkg,
	})
}
