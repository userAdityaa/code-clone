package database

import (
	"fmt"
	"log"
	"os"

	"github.com/userAdityaa/goDocker/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Dbinstance struct {
	Db *gorm.DB
}

var DB Dbinstance

// var SandBoxDB Dbinstance

func ConnectDB() {

	dsn := fmt.Sprintf("host = db user = %s password = %s dbname = %s sslmode = disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to the Database.")
	db.Logger = logger.Default.LogMode(logger.Info)

	log.Println("auto migrations")
	db.AutoMigrate(&models.GoogleModel{}, &models.SandBox{})

	DB = Dbinstance{
		Db: db,
	}
}
