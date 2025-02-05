package models

import (
	"time"

	"gorm.io/gorm"
)

// Structure Product
type Product struct {
	ID          uint           `json:"id" gorm:"primaryKey;autoIncrement"`
	Name        string         `json:"name" gorm:"not null"`
	Description string         `json:"description"`
	Price       float64        `json:"price" gorm:"not null"`
	Image       string         `json:"image"` // URL ou chemin de l'image du produit
	Category    string         `json:"category"` // Catégorie du produit
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"` // Pour une suppression "soft delete"
}

