# frozen_string_literal: true

class APIToken
  attr_reader :user
  def initialize(user:)
    @user = user
  end

  def to_jwt
    JSONWebToken.new.encode(payload: payload)
  end

  class << self
    def scope
      "api"
    end

    def decode(token:)
      OpenStruct.new(JSONWebToken.decode(token))
    rescue JSONWebToken::TokenError
      OpenStruct.new
    end
  end

  private

  def payload
    {
      scope: self.class.scope,
      sub: user.id
    }
  end
end
