module Heroku
  class Error < StandardError
    class Unauthorized < StandardError; end
  end
end