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
  end
end