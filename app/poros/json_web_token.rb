# frozen_string_literal: true

class JSONWebToken
  class TokenError < StandardError; end
  class TokenValidationError < StandardError; end

  def encode(payload: {})
    full_payload = default_payload.merge(payload)
    validate(payload: full_payload)

    JWT.encode(
      full_payload,
      self.class.secret_key,
      self.class.algorithm,
    )
  end

  private

  def validate(payload:)
    claims = self.class.required_claims
    has_claims = claims.all? { |claim| payload.key?(claim) }
    raise(TokenValidationError, "Payload requires claims - #{claims}") unless has_claims
  end

  def default_payload
    {
      iat: Time.now.to_i,
      iss: "Signs",
      aud: "Signs User",
      exp: 1.day.from_now.to_i
    }
  end

  class << self
    def decode(token)
      decode_token(token).first.with_indifferent_access
    rescue *jwt_errors => e
      raise TokenError, e.message
    end

    def decode_token(token)
      JWT.decode(token, secret_key, true, algorithm: algorithm)
    end

    def secret_key
      Rails.application.credentials.secret_key_base
    end

    def algorithm
      "HS256"
    end

    def jwt_errors
      [JWT::ExpiredSignature, JWT::DecodeError]
    end

    def required_claims
      %i[
        iat
        iss
        aud
        exp
        sub
        scope
      ]
    end
  end
end
