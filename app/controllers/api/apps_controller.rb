# frozen_string_literal: true

module API
  class AppsController < APIController
    def index

    end

    def heroku
      render json: heroku_account.apps
    end

    def create
      result = CreateApp.call(app_params: app_params, current_user: current_user)

      if result.success?
        render(
          json: AppSerializer.new(
            result.app,
            params: { current_user_id: current_user.id },
          ).serializable_hash,
          status: 201,
        )
      else
        render_errors(result.errors)
      end
    end

    def update
      result = UpdateApp.call(
        id: params[:id],
        app_params: app_update_params,
        current_user: current_user,
      )

      if result.success?
        render(
          json: AppSerializer.new(
            result.app,
            params: { current_user_id: current_user.id },
          ).serializable_hash,
          status: 200,
        )
      else
        render_errors(result.errors)
      end
    end

    private

    def app_params
      params.require(:app).permit(:name, :region)
    end

    def app_update_params
      params.require(:app).permit(:name, :favorite)
    end
  end
end
