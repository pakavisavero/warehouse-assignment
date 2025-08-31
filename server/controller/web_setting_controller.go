package controller

import (
	"net/http"
	"server/model"

	"github.com/gin-gonic/gin"
)

type WebSettingController struct {
	Model *model.WebSettingModel
}

func (wc *WebSettingController) Get(c *gin.Context) {
	setting, err := wc.Model.Get()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Web setting not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Web setting fetched successfully", "data": setting})
}

func (wc *WebSettingController) CreateOrUpdate(c *gin.Context) {
	var req model.WebSetting
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := wc.Model.CreateOrUpdate(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Web setting saved successfully", "data": req})
}
