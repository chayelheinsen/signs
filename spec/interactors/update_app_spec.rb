# frozen_string_literal: true

require "rails_helper"

RSpec.describe UpdateApp, type: :interactor do
  let(:interactor) { UpdateApp }
  let(:app_params) { attributes_for(:app, favorite: false) }
  let(:user) { create(:user) }
  let(:app) { create(:app, favorite: true, users: [user]) }

  describe "#call" do
    context "with valid attributes" do
      it "updates the app and is successful" do
        result = interactor.call(id: app.id, app_params: app_params, current_user: user)

        expect(result.success?).to eq(true)
        expect(result.app.favorite).to eq(app_params[:favorite])
        expect(result.app.name).to eq(app_params[:name].downcase)
      end
    end

    context "with invalid user" do
      it "returns an error" do
        result = interactor.call(id: app.id, app_params: app_params, current_user: create(:user))

        expect(result.success?).to eq(false)
        expect(result.app.favorite).to eq(app.favorite)
        expect(result.app.name).to eq(app.name)
      end
    end
  end
end
