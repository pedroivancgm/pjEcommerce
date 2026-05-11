module Products
  class CreateProduct
    include Interactor

    def call
      product = context.current_user.products.new(context.product_params)

      if product.save
        context.product = product
      else
        context.fail!(errors: product.errors)
      end
    end
  end
end
