package models

import "gorm.io/gorm"

type GoogleModel struct {
	gorm.Model
	GoogleId string
	Email    string
}
