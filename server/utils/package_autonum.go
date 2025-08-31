package utils

import (
	"fmt"
	"time"
)

func GeneratePackageID() string {
	timestamp := time.Now().Unix()
	last7 := timestamp % 10000000

	return fmt.Sprintf("PKG%07d", last7)
}
