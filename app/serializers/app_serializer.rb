# frozen_string_literal: true

class AppSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :type, :region, :server, :favorite, :owner_id, :heroku_id

  attribute :is_owner do |object, params|
    object.owner_id == params[:current_user_id]
  end
end
