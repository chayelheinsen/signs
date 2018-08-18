# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    render :index, locals: {
      apps: AppSerializer.new(
        current_user.apps.ordered,
        is_collection: true,
        params: { current_user_id: current_user.id }
      ).serializable_hash
    }
  end
end
