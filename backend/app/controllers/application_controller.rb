# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  SECRET_KEY = Rails.application.secret_key_base

  def encode_token(payload)
    JWT.encode(payload, SECRET_KEY)
  end

  def decode_token(token)
    JWT.decode(token, SECRET_KEY)[0]
  rescue
    nil
  end

  def auth_header
    request.headers['Authorization']
  end

  def current_user
    if auth_header
      token = auth_header.split(' ')[1]
      decoded = decode_token(token)
      User.find(decoded["user_id"]) if decoded
    end
  end

  def authorized
    render json: { error: "Não autorizado" }, status: :unauthorized unless current_user
  end
end