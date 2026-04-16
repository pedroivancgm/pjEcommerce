class User < ApplicationRecord
  has_secure_password
  
  has_one :cart
  has_many :products

  validates :email, uniqueness: true
end
