package main

import (
	"fmt"
	"log"
	"server/config"
	"server/controller"
	"server/middleware"
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
			duration, err := pkgModel.GetExpiryDuration()
			if err != nil {
				log.Println("Failed to get expiry duration:", err)
				continue
			}
			if err := pkgModel.ExpireOldPackages(duration); err != nil {
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

	// Models & Controllers
	packageModel := &model.PackageModel{DB: db}
	packageController := &controller.PackageController{Model: packageModel}

	webSettingModel := &model.WebSettingModel{DB: db}
	webSettingController := &controller.WebSettingController{Model: webSettingModel}

	userModel := &model.UserModel{DB: db}
	userController := &controller.UserController{Model: userModel}

	packageLogModel := &model.PackageLogModel{DB: db}
	packageLogController := &controller.PackageLogController{Model: packageLogModel}

	startPackageExpiryChecker(packageModel)

	mode := config.GetEnv("GO_ENV", "development")
	if mode == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-User-ID"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		AllowCredentials: true,
	}))

	// Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "OK"})
	})

	// Auth routes
	api := r.Group("/api/v1")
	api.POST("/login", userController.Login)
	api.POST("/logout", userController.Logout)

	api.Use(middleware.AuthMiddleware(userModel))
	{
		api.GET("/packages", packageController.GetAll)
		api.PATCH("/packages/:id/status", packageController.UpdateStatus)
		api.GET("/packages/:id", packageController.GetByID)
		api.POST("/packages", packageController.Create)

		api.GET("/web-setting", webSettingController.Get)
		api.POST("/web-setting", webSettingController.CreateOrUpdate)

		api.GET("/package-logs", packageLogController.GetAll)
	}

	// Start server
	port := config.GetEnv("WEB_PORT", "8080")
	log.Printf("Starting server on :%s", port)
	if err := r.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
