# frozen_string_literal: true

require "rails_helper"

RSpec.describe CreateApp, type: :interactor do
  let(:interactor) { CreateApp }
  let(:app_params) { attributes_for(:app) }

  describe "#call" do
    context "with valid attributes" do
      it "creates a new app and is successful" do
        expect do
          interactor.call(app_params: app_params, current_user: create(:user))
        end.to change { App.count }.by(1)
      end
    end
  end
end
