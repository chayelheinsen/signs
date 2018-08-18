# frozen_string_literal: true

require "rails_helper"

module RequestHelpers
  def auth_for(user)
    token = user.new_api_token
    { "Authorization": "Bearer #{token}" }
  end

  def bad_auth_header
    { "Authorization": "Bearer not_a_good_token" }
  end

  def response_body
    JSON.parse(response.body)
  end

  def match_response_schema(path, **options)
    options[:strict] = true unless options.key?(:strict)

    super(path, options)
  end
end

RSpec.configure do |config|
  config.include RequestHelpers
end

RSpec::Matchers.define :match_collection do |collection|
  match do |response|
    expect(collection.pluck("id")).to match_array(response.pluck("id"))
  end
end

RSpec::Matchers.define :match_ordered_collection do |collection|
  match do |response|
    expect(collection.pluck("id")).to eq response.pluck("id")
  end
end
