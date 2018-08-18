# frozen_string_literal: true

# == Schema Information
#
# Table name: user_apps
#
#  id         :bigint(8)        not null, primary key
#  user_id    :bigint(8)
#  app_id     :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :user_app do
    user nil
    app nil
  end
end
