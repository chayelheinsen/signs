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

require "rails_helper"

RSpec.describe App, type: :model do
  describe "Validations" do
    context "Factory" do
      it "has a valid factory" do
        app = create(:app)
        expect(app).to be_valid
      end
    end

    context "name" do
      it "required to be present" do
        app = build_and_validate(:app, name: nil)
        expect(app.errors).to include(:name)
      end

      it "required to be unique" do
        create(:app, name: "my-cool-app")
        app = build_and_validate(:app, name: "my-cool-app")
        expect(app.errors).to include(:name)
      end
    end
  end
end
