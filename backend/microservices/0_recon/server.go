package main

import (
	"fmt"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		Prefork:       true,
		CaseSensitive: true,
		StrictRouting: true,
		ServerHeader:  "Recon as a Service",
		AppName:       "Toolserver",
	})

	// Routes
	app.Get("/", func(c *fiber.Ctx) error {
		return root(c, app)
	})

	app.Route("/api/v1", func(api fiber.Router) {
		api.Get("/start", test).Name("start")
		api.Get("/stop", test).Name("stop")
	}, "api.")

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		fmt.Println(c.Locals("Host")) // "Localhost:3000"
		for {
			mt, msg, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				break
			}
			log.Printf("recv: %s", msg)
			err = c.WriteMessage(mt, msg)
			if err != nil {
				log.Println("write:", err)
				break
			}
		}
	}))

	// Start server
	log.Fatal(app.Listen(":3000"))
}

// Handler
func root(c *fiber.Ctx, app *fiber.App) error {
	endpoints := app.Stack()
	return c.JSON(endpoints)
}

func test(c *fiber.Ctx) error {
	return c.SendString("test")
}
