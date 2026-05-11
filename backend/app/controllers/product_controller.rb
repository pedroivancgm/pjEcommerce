class ProductController < ApplicationController
  before_action :authorized, only: [:create, :destroy]

  def index 
    product = Product.all 
    render json: product
  end

  def create 
    result = Products::CreateProduct.call(
      current_user: current_user,
    product_params: product_params
    )

    if result.success?
      render json: result.product, status: :created
    else
      render json: result.errors, status: :unprocessable_entity
    end
  end


  def destroy
    result = Products::DestroyProduct.call(
      current_user: current_user,
      product_params: params[:id]
    )

    if result.success?
      render json: "Produto deletado", status: 204
    else
      render json: result.errors , status: :unprocessable_entity
    end
  end

  def user_products
      
  end

  private
  def product_params
    params.require(:product).permit(:name,:description,:price,:category)
  end
end
