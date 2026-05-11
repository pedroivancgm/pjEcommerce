module Auth
  class Login
    include Interactor

    def call
      user = User.find_by(email: context.email)

      unless user&.authenticate(context.password)
        context.fail!(error: "Credenciais inválidas")
      end

      context.user = user
      context.token = JWT.encode({ user_id: user.id }, Rails.application.secret_key_base)
    end
  end
end
