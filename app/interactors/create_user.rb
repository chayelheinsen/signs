# frozen_string_literal: true

class CreateUser
  include Interactor

  delegate :user_params, to: :context

  def call
    user = User.new(user_params)

    unless user.save
      context.fail!(errors: user.errors)
    end
  end
end
