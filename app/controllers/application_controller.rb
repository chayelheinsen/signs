# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Forerunner
  include SessionsHelper

  def direct_to_dashboard
    redirect_to dashboard_index_path
  end

  def serialized_user
    UserSerializer.new(current_user).serializable_hash
  end
  helper_method :serialized_user
end
