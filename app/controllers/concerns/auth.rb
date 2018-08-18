# frozen_string_literal: true

module Auth
  class Error < StandardError; end

  def authenticate_with_token!
    current_user || raise(Auth::Error)
  end

  def current_user
    @current_user ||= find_current_user_by_auth_token
  end

  def http_auth_token
    @http_auth_token ||=
      if request.headers["Authorization"].present?
        request.headers["Authorization"].split(" ").last
      end
  end

  private

  def auth_token
    @auth_token ||= APIToken.decode(token: http_auth_token)
  end

  def find_current_user_by_auth_token
    return if auth_token.nil?

    User.find(auth_token.sub)
  rescue ActiveRecord::RecordNotFound
    nil
  end
end
