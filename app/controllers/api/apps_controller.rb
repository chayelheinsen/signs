# frozen_string_literal: true

module API
  class AppsController < APIController
    def create
      result = CreateApp.call(app_params: app_params, current_user: current_user)

      if result.success?
        render(
          json: AppSerializer.new(
            result.app,
            params: { current_user_id: current_user.id }
          ).serializable_hash,
          status: 201
        )
      else
        render_errors(result.message)
      end
    end
  end

  private

  def app_params
    params.require(:app).permit(:name, :region)
  end
end
