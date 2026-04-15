class ProductController < ApplicationController
  before_action :authorized, only: [:create]

  def index 
    product = Product.all 
    render json: product
  end

  def create 
    product = current_user.products.new(product_params)
    if product.save
      render json: product, status: :created
    else
      render json: :errors , status: :unprocessable_entity
    end
  end



  private
  def product_params
    params.require(:product).permit(:name,:description,:price,:category)
  end
end
