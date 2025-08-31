package types

type Meta struct {
	Limit      int `json:"limit"`
	Page       int `json:"page"`
	TotalPages int `json:"totalPages"`
	Total      int `json:"total"`
}
