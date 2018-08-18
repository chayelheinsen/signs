# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_secure_password

  has_many :user_apps
  has_many :apps, through: :user_apps

  VALID_EMAIL_REGEX = /.+@.+/i

  validates :email, presence: true, uniqueness: true,
                    case_sensitive: false, format: VALID_EMAIL_REGEX
  validates :password, confirmation: true, length: { minimum: 8 }, if: :validate_password?

  def new_api_token
    APIToken.new(user: self).to_jwt
  end

  private

  def validate_password?
    new_record? || password_digest_changed?
  end
end
