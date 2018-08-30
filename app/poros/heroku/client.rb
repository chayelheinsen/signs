# frozen_string_literal: true

module Heroku
  class Client
    attr_reader :client
    def initialize(token:)
      @client = PlatformAPI.connect_oauth(token)
    rescue Excon::Error::Unauthorized
      raise Heroku::Error::Unauthorized
    end

    def account
      client.account.info
    end

    def apps
      client.app.list
    end

    def app(id_or_name)
      client.app.info(id_or_name)
    end
  end
end
