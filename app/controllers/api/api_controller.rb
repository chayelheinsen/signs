# frozen_string_literal: true

module API
  class APIController < ActionController::API
    include Auth

    before_action :authenticate_with_token!

    rescue_from Auth::Error, with: :render_auth_error
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_error

    def render_errors(errors, status: 422)
      render json: { errors: errors }, status: status
    end

    def render_auth_error
      render_errors("Not authenticated", status: 401)
    end

    def record_not_found_error
      render_errors("Record not found", status: 404)
    end
  end
end
