# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Apps", type: :request do
  let(:user) { create(:user) }
  let(:app_params) { attributes_for(:app) }
  let(:headers) { auth_for(user) }

  describe "POST /api/apps" do
    before do
      post "/api/apps", params: { app: app_params }, headers: headers
    end

    context "with valid attributes" do
      it "returns the app" do
        expect(response.status).to eq(201)
        expect(response).to match_response_schema("app", strict: false)
      end
    end

    context "when not given a valid token" do
      let(:headers) { bad_auth_header }

      it "renders an error" do
        expect(response.status).to eq(401)
      end
    end
  end
end
