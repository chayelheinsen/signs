# frozen_string_literal: true

class UpdateApp
  include Interactor

  delegate :id, :app_params, :current_user, :app, to: :context

  def call
    context.app = find_app

    validate_user

    unless app.update(app_params)
      context.fail!(errors: app.errors)
    end
  end

  private

  def find_app
    App.find(id)
  end

  def validate_user
    message = "Not authorized to perform this action"
    context.fail!(errors: message) if app.users.where(id: current_user.id).empty?
  end
end
