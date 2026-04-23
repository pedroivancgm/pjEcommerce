# app/controllers/auth_controller.rb
class AuthController < ApplicationController
  def register
    user = User.new(user_params)
    if user.save
      token = encode_token({ user_id: user.id })
      render json: { user: user, token: token }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = encode_token({ user_id: user.id })
      render json: { user: user, token: token }, status: :ok
    else
      render json: { error: "Credenciais inválidas" }, status: :unauthorized
    end
  end

  def logout
   
  end

  def profile
    render json: current_user
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end