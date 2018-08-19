# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Apps", type: :request do
  let(:user) { create(:user) }
  let(:app_params) { attributes_for(:app) }
  let(:headers) { auth_for(user) }
  let(:app_object) { create(:app, users: [user]) }
  let(:app_id) { app_object.id }

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

  describe "PATCH /api/apps/:id" do
    before do
      patch "/api/apps/#{app_id}", params: { app: app_params }, headers: headers
    end

    context "with a valid user" do
      it "updates the app and returns it" do
        expect(response.status).to eq(200)
        expect(response).to match_response_schema("app", strict: false)
      end
    end

    context "with an invalid user" do
      let(:app_object) { create(:app) }

      it "returns an error" do
        expect(response.status).to eq(422)
      end
    end

    context "when the app doesn't exist" do
      let(:app_id) { 0 }

      it "returns an error" do
        expect(response.status).to eq(404)
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
