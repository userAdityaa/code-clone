package models

import "gorm.io/gorm"

type SandBox struct {
	gorm.Model
	Tech string `json:"tech"`
	Name string `json:"name"`
	HTML string `json:"html"`
	CSS  string `json:"css"`
	JS   string `json:"js"`
}
