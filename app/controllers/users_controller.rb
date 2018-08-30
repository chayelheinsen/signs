# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :require_user!

  def new; end

  def create
    result = CreateUser.call(user_params: user_params)

    if result.success?
      log_in(result.user)
      render json: { status: "Success" }
    else
      render json: result.errors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email, :password, :password_confirmation, :heroku_token
    )
  end
end
