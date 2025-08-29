package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message": "Hello from Go backend"}`))
	})

	fmt.Println("🚀 Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
