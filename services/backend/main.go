package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(ev *core.ServeEvent) error {
		ev.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/v1/",
			Handler: func(ctx echo.Context) error {
				return ctx.String(200, "worknal")
			},
		})

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
