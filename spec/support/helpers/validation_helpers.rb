# frozen_string_literal: true

require "rails_helper"

module ValidationHelpers
  def build_and_validate(*args)
    FactoryBot.build(*args).tap(&:validate)
  end

  def build_stubbed_and_validate(*args)
    FactoryBot.build_stubbed(*args).tap(&:validate)
  end

  def create_and_validate(*args)
    FactoryBot.create(*args).tap(&:validate)
  end
end

RSpec.configure do |config|
  config.include ValidationHelpers
end
