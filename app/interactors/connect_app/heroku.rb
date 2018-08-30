# frozen_string_literal: true

module ConnectApp
  class Heroku
    include Interactor

    delegate :heroku_app, :current_user, to: :context
    def call
      result = CreateApp.call(
        app_params: { name: heroku_app.name, heroku_id: heroku_app.id },
        current_user: current_user,
      )

      if result.success?
        context.app = result.app
      else
        context.fail!(errors: result.errors)
      end
    end
  end
end
