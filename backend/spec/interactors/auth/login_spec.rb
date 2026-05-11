require "rails_helper"

RSpec.describe Auth::Login do
  describe ".call" do
    context "with valid credentials" do
      it "authenticates the user and returns a token" do
        user = User.create!(email: "login@example.com", password: "password123")

        result = described_class.call(email: user.email, password: "password123")

        expect(result).to be_success
        expect(result.user).to eq(user)
        expect(result.token).to be_present
      end
    end

    context "with invalid credentials" do
      it "fails with an error message" do
        User.create!(email: "login@example.com", password: "password123")

        result = described_class.call(email: "login@example.com", password: "wrong-password")

        expect(result).to be_failure
        expect(result.error).to eq("Credenciais inválidas")
      end
    end
  end
end
