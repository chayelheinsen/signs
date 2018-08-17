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

require "rails_helper"

RSpec.describe User, type: :model do
  describe "Validations" do
    context "Factory" do
      it "has a valid factory" do
        user = create(:user)
        expect(user).to be_valid
      end
    end

    context "email" do
      it "required to be present" do
        user = build_and_validate(:user, email: nil)
        expect(user.errors).to include(:email)
      end

      it "required to be unique" do
        create(:user, email: "test@email.com")
        user = build_and_validate(:user, email: "test@email.com")
        expect(user.errors).to include(:email)
      end

      it "required to be an email" do
        user = build_and_validate(:user, email: "not_an_email")
        expect(user.errors).to include(:email)
      end
    end
  end

  describe "Methods" do
    # describe "#generate_password_reset_token" do
    #   context "with valid user" do
    #     it "adds a password reset token to the user" do
    #       user = create(:user, password_reset_token: nil)
    #       user.generate_password_reset_token
    #       expect(user.password_reset_token).to be
    #     end
    #   end
    # end
    #
    # describe "#update_password" do
    #   let(:user) { create(:user) }
    #
    #   context "with valid password and confirmation" do
    #     it "it updates the users password" do
    #       password = "test_password"
    #       user.update_password(password, password)
    #       expect(user.authenticate(password)).to be(user)
    #     end
    #   end
    #
    #   context "with invalid password and confirmation" do
    #     it "it doesn't update the users password" do
    #       password = "12345"
    #       user.update_password(password, password)
    #       expect(user.errors).to include(:password)
    #       expect(user.reload.authenticate(password)).to be(false)
    #     end
    #   end
    #
    #   context "with non-matching confirmation" do
    #     it "it doesn't update the users password" do
    #       user.update_password("password", "not_matching")
    #       expect(user.errors).to include(:password_confirmation)
    #     end
    #   end
    # end
  end
end
