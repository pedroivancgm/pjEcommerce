module Products
    class DestroyProduct
      include Interactor
      def call
        # product = current_user.products.find(params[:id])
        product = context.current_user.products.find(id: context.product_id)

        if product.destroy
          context.success
        else
          context.fail!(errors: product.errors)
        end
      end
    end
end