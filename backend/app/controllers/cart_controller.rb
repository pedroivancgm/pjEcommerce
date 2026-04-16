class CartController < ApplicationController
  before_action :authorized
  before_action :set_cart


  def show_cart
    render json: @cart.cart_items.includes(:product).map { |item|
      {
      id: item.id,
      product_id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
      }
    }
  end

  def add_prod
    item = @cart.cart_items.find_by(product_id: params[:product_id])

    if item
      item.increment!(:quantity)
    else
      @cart.cart_items.create!(
        product_id: params[:product_id],
        quantity: 1
      )
    end
  end

  def remove_prod
    item = @cart.cart_items.find_by(product_id: params[:product_id])

    if item
      if item.quantity >1
        item.decrement!(:quantity)
      else
        item.destroy
      end
      render json: { message: "Ação foi concluída"}, status: :ok
    else
      render json: { error: "Produto não encontrado"}, status: :not_found
    end
  end

  private
  def set_cart
    @cart = current_user.cart
    unless @cart
      @cart = Cart.create(user: current_user)
    end
  end
end
