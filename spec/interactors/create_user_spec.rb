# frozen_string_literal: true

require "rails_helper"

RSpec.describe CreateUser, type: :interactor do
  let(:interactor) { CreateUser }
  let(:user_params) do
    {
      email: Faker::Internet.email,
      password: "password",
      password_confirmation: "password"
    }
  end

  describe "#call" do
    context "with valid email and password/conf" do
      it "creates a new user and is successful" do
        expect { interactor.call(user_params: user_params) }.to change { User.count }.by(1)
      end
    end
  end
end
