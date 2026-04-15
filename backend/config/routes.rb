Rails.application.routes.draw do
  
  get "up" => "rails/health#show", as: :rails_health_check

  post "/products", to: "product#create"
  get "/products", to: "product#index"

  post "/register", to: "auth#register"
  post "/login", to: "auth#login"
  get "/profile", to: "auth#profile"
end
