# frozen_string_literal: true

class CreateApp
  include Interactor

  delegate :app_params, :current_user, to: :context

  def call
    attributes = app_params.merge(
      owner: current_user,
      users: [current_user],
    )

    app = App.new(attributes)

    unless app.save
      context.fail!(errors: app.errors)
    end

    context.app = app
  end
end
