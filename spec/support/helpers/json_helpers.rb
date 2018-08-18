# frozen_string_literal: true

require "rails_helper"

module JSONHelpers
  def json
    j = JSON.parse(response.body)

    j.is_a?(Hash) ? j.with_indifferent_access : j
  end
end

RSpec.configure do |config|
  config.include JSONHelpers
end
