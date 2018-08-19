# frozen_string_literal: true

# == Schema Information
#
# Table name: apps
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  type       :string           default("None")
#  region     :string           default("")
#  server     :string           default("")
#  favorite   :boolean          default(FALSE)
#  owner_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :app do
    name { "#{Faker::App.name}-#{SecureRandom.hex}" }
    type "Ruby"
    region "United States"
    server "t2.micro"
    favorite false
    owner { create(:user) }

    after(:build) do |app|
      app.users ||= [FactoryBot.build(:user)]
    end
  end
end
