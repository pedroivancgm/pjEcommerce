class ProductController < ApplicationController
  before_action :authorized, only: [:create, :destroy]

  def index 
    product = Product.all 
    render json: product
  end

  def create 
    product = current_user.products.new(product_params)
    if product.save
      render json: product, status: :created
    else
      render json: product.errors , status: :unprocessable_entity
    end
  end

  def destroy
    product = current_user.products.find(params[:id])
    if product.destroy
      render json: "Produto deletado", status: 204
    else
      render json: "Não foi possível deletar o producto", status: :unprocessable_entity
    end
  end

  private
  def product_params
    params.require(:product).permit(:name,:description,:price,:category)
  end
end
