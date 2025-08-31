package middleware

import (
	"net/http"
	"server/model"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(userModel *model.UserModel) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetHeader("X-User-ID")
		if userID == "" || !userModel.IsActive(userID) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
		c.Next()
	}
}
