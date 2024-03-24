package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/gorilla/pat"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/userAdityaa/goDocker/database"
	"github.com/userAdityaa/goDocker/models"
)

func main() {
	database.ConnectDB()

	key := "Secret-session-key" // Replace with your SESSION_SECRET or similar
	maxAge := 86400 * 30        // 30 days
	isProd := false             // Set to true when serving over https

	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true // HttpOnly should always be enabled
	store.Options.Secure = isProd

	gothic.Store = store

	goth.UseProviders(
		google.New(os.Getenv("GOOGLE_CLIENT_ID"), os.Getenv("GOOGLE_CLIENT_SECRET"), "http://localhost:8000/auth/google/callback", "email", "profile"),
	)

	p := pat.New()

	p.Post("/sandbox", func(res http.ResponseWriter, req *http.Request) {

		var sandbox models.SandBox

		err := json.NewDecoder(req.Body).Decode(&sandbox)

		if err != nil {
			http.Error(res, "Error decoding request body",
				http.StatusInternalServerError)
			return
		}

		// var db *gorm.DB

		// database.SandBoxDB.Db

		sandbox.HTML = "//Code Here:"
		sandbox.CSS = "/*Code Here*/"
		sandbox.JS = "//Code Here:"

		err = database.DB.Db.Create(&sandbox).Error

		if err != nil {
			http.Error(res, "Error creating sandbox",
				http.StatusInternalServerError)
			return
		}

	})

	p.Get("/auth/{provider}/callback", func(res http.ResponseWriter, req *http.Request) {
		user, err := gothic.CompleteUserAuth(res, req)
		if err != nil {
			fmt.Println("Something galat hain")
			fmt.Fprintln(res, err)
			return
		}

		params := url.Values{}
		params.Add("email", user.Email)
		params.Add("name", user.Name)

		// Append the query parameters to the redirect URL
		// redirectURL := fmt.Sprintf("http://localhost:3000/CreateSandBox?%s", params.Encode())

		http.Redirect(res, req, "http://localhost:3000/CreateSandBox", http.StatusTemporaryRedirect)
	})

	// p.Get("/api/session", func(res http.ResponseWriter, req *http.Request) {
	// 	cookie, err := req.Cookie(" a_session_console_legacy")
	// 	fmt.Println("User: ", cookie)

	// 	user := cookie.Value

	// 	if err != nil {
	// 		http.Error(res, "Error retrieving user from session: "+err.Error(), http.StatusInternalServerError)
	// 		return
	// 	}

	// 	// If the user is not found, return a proper response
	// 	if user == "" {
	// 		http.Error(res, "User not found in session", http.StatusNotFound)
	// 		return
	// 	}

	// 	// Serialize the user to JSON
	// 	userJson, err := json.Marshal(user)
	// 	if err != nil {
	// 		http.Error(res, "Error encoding JSON: "+err.Error(), http.StatusInternalServerError)
	// 		return
	// 	}

	// 	// Set the Content-Type header
	// 	res.Header().Set("Content-Type", "application/json")

	// 	// Write the JSON response
	// 	res.Write(userJson)
	// })

	p.Get("/auth/{provider}", func(res http.ResponseWriter, req *http.Request) {
		gothic.BeginAuthHandler(res, req)
	})

	p.Get("/{name}", func(res http.ResponseWriter, req *http.Request) {
		// Retrieve the value of the "name" parameter from the URL path
		name := req.URL.Query().Get(":name")

		// Your existing code here
		var sandbox models.SandBox
		err := database.DB.Db.Find(&sandbox, "name = ?", name).Error
		if err != nil {
			http.Error(res, "Error finding sandbox", http.StatusInternalServerError)
			return
		}
		sandboxJson, err := json.Marshal(sandbox)
		if err != nil {
			log.Fatal(err)
		}
		res.Header().Set("Content-Type", "application/json")
		res.Write(sandboxJson)
	})

	p.Get("/", func(res http.ResponseWriter, req *http.Request) {
		var sandboxes []models.SandBox
		err := database.DB.Db.Find(&sandboxes).Error
		if err != nil {
			http.Error(res, "Error finding sandboxes", http.StatusInternalServerError)
			return
		}
		sandboxesJson, err := json.Marshal(sandboxes)
		if err != nil {
			log.Fatal(err)
		}
		res.Header().Set("Content-Type", "application/json")
		res.Write(sandboxesJson)
	})

	// p.Delete("/", func(res http.ResponseWriter, req *http.Request) {
	// 	var sandboxes []models.SandBox
	// 	err := database.DB.Db.Find(&sandboxes).Error
	// 	if err != nil {
	// 		http.Error(res, "Error finding sandboxes", http.StatusInternalServerError)
	// 		return
	// 	}
	// 	err = database.DB.Db.Delete(&sandboxes).Error
	// 	if err != nil {
	// 		http.Error(res, "Error deleting sandbox", http.StatusInternalServerError)
	// 		return
	// 	}
	// })

	p.Put("/", func(res http.ResponseWriter, req *http.Request) {
		var sandbox models.SandBox
		err := json.NewDecoder(req.Body).Decode(&sandbox)

		// fmt.Println(sandbox)

		// fmt.Println("Kuch toh hora hain ")

		if err != nil {
			http.Error(res, "Error decoding request body", http.StatusInternalServerError)
			return
		}

		var anotherBox models.SandBox

		err = database.DB.Db.Find(&anotherBox, "name = ?", sandbox.Name).Error

		if err != nil {
			http.Error(res, "Error finding sandbox", http.StatusInternalServerError)
			return
		}

		// anotherBox.Text = sandbox.Text
		anotherBox.HTML = sandbox.HTML
		anotherBox.CSS = sandbox.CSS
		anotherBox.JS = sandbox.JS

		// // err = database.DB.Db.Save(&anotherBox).Error

		// // if err != nil {
		// // 	http.Error(res, "Error updating sandbox", http.StatusInternalServerError)
		// // 	return
		// // }

		err = database.DB.Db.Model(&anotherBox).Updates(map[string]interface{}{"HTML": anotherBox.HTML, "CSS": anotherBox.CSS, "JS": anotherBox.JS}).Error
		if err != nil {
			http.Error(res, "Error updating sandbox", http.StatusInternalServerError)
			return
		}
	})

	// p.Get("/sandbox/{name}", func(res http.ResponseWriter, req *http.Request) {
	// 	vars := mux.Vars(req)
	// 	name := vars["name"]

	// 	var sandbox SandBox

	// 	err := sandboxDB.Find(&sandbox, "name = ?", name)

	// 	if err != nil {
	// 		http.Error(res, "Error finding sandbox",
	// 			http.StatusInternalServerError)
	// 		return
	// 	}

	// 	sandboxJson, err := json.Marshal(sandbox)

	// 	if err != nil {
	// 		log.Fatal(err)
	// 	}

	// 	res.Header().Set("Content-Type", "application/json")
	// 	// res.Write(s)
	// })

	log.Println("listening on localhost:8000")
	enhancedRouter := enableCORS(jsonContentTypeMiddleware(p))
	// start server
	log.Fatal(http.ListenAndServe(":8000", enhancedRouter))

}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Check if the request is for CORS preflight
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass down the request to the next middleware (or final handler)
		next.ServeHTTP(w, r)
	})
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set JSON Content-Type
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
