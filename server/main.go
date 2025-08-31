package main

import (
	"fmt"
	"log"
	"server/config"
	"server/controller"
	"server/model"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func startPackageExpiryChecker(pkgModel *model.PackageModel) {
	ticker := time.NewTicker(1 * time.Minute)
	go func() {
		for range ticker.C {
			if err := pkgModel.ExpireOldPackages(10 * time.Minute); err != nil {
				log.Println("Failed to expire packages:", err)
			}
		}
	}()
}

func main() {
	rawDB, err := config.InitDB()
	if err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}
	defer rawDB.Close()
	db := sqlx.NewDb(rawDB, "postgres")

	// Initialize models and controllers
	packageModel := &model.PackageModel{DB: db}
	packageController := &controller.PackageController{Model: packageModel}

	// Start the package expiry checker
	startPackageExpiryChecker(packageModel)

	mode := config.GetEnv("GO_ENV", "development")
	if mode == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "OPTIONS", "PATCH"},
		AllowHeaders:    []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders: []string{
			"Content-Length",
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Headers",
			"Content-Type",
		},
		AllowCredentials: true,
	}))

	// Check Health
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "OK",
		})
	})

	// API routes
	api := r.Group("/api/v1")
	api.GET("/packages", packageController.GetAll)
	api.PATCH("/packages/:id/status", packageController.UpdateStatus)
	api.GET("/packages/:id", packageController.GetByID)
	api.POST("/packages", packageController.Create)

	port := config.GetEnv("WEB_PORT", "8080")
	log.Printf("Starting server on :%s", port)
	if err := r.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
