class UsersController < ApplicationController
  def new
    render :new, layout: "unauthorized"
  end

  def create

  end
end