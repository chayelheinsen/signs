# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :require_user!

  def new
    direct_to_dashboard if current_user
  end

  def create
    user = find_user

    if user&.authenticate(login_params[:password])
      log_in(user)
      render json: { status: "Success" }
    else
      render json: { error: "Email/password combination is incorrect" }, status: 422
    end
  end

  def destroy
    log_out
    redirect_to login_path
  end

  private

  def login_params
    params.require(:session).permit(:email, :password)
  end

  def find_user
    User.find_by(email: login_params[:email])
  end
end
