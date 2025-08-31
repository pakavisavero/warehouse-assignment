package controller

import (
	"net/http"
	"server/model"

	"github.com/gin-gonic/gin"
)

type PackageLogController struct {
	Model *model.PackageLogModel
}

func (pc *PackageLogController) GetAll(c *gin.Context) {
	logs, err := pc.Model.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to fetch package logs",
			"data":    nil,
		})
		return
	}

	resp := make([]gin.H, len(logs))
	for i, l := range logs {
		resp[i] = gin.H{
			"id": l.ID,
			"package": gin.H{
				"id":        l.PackageID,
				"order_ref": l.OrderRef,
				"status":    l.Status,
			},
			"old_status": l.OldStatus,
			"new_status": l.NewStatus,
			"changed_at": l.ChangedAt,
			"changed_by": l.ChangedBy,
			"note":       l.Note,
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Package logs fetched successfully",
		"data":    resp,
	})
}
