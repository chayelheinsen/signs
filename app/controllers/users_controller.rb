# frozen_string_literal: true

class UsersController < ApplicationController
  def new
    render :new, layout: "unauthorized"
  end

  def create
    result = CreateUser.call(user_params: user_params)

    if result.success?
    else
      render json: result.errors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
