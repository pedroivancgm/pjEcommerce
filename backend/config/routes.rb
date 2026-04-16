Rails.application.routes.draw do
  
  get "up" => "rails/health#show", as: :rails_health_check

  post "/products", to: "product#create"
  get "/products", to: "product#index"

  post "/register", to: "auth#register"
  post "/login", to: "auth#login"
  get "/profile", to: "auth#profile"


  post "/cart/add", to: "cart#add_prod"
  post "/cart/remove", to: "cart#remove_prod"
  get "/cart/show", to: "cart#show_cart"
end
