package controller

import (
	"net/http"
	"server/model"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	Model *model.UserModel
}

func (uc *UserController) Login(c *gin.Context) {
	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request. Check JSON format and fields.",
			"data":    nil,
		})
		return
	}

	user, err := uc.Model.Authenticate(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid username or password.",
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful.",
		"data": gin.H{
			"id":       user.ID,
			"username": user.Username,
		},
	})
}

func (uc *UserController) Logout(c *gin.Context) {
	var req struct {
		UserID string `json:"user_id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	if err := uc.Model.Logout(req.UserID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Logout failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged out"})
}
