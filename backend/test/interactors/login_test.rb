require "test_helper"

class LoginTest < ActiveSupport::TestCase
  test "authenticates user and returns token" do
    user = User.create!(email: "login@example.com", password: "password123")

    result = Auth::Login.call(email: user.email, password: "password123")

    assert result.success?
    assert_equal user, result.user
    assert result.token.present?
  end

  test "fails with invalid credentials" do
    User.create!(email: "login@example.com", password: "password123")

    result = Auth::Login.call(email: "login@example.com", password: "wrong-password")

    assert result.failure?
    assert_equal "Credenciais inválidas", result.error
  end
end
