# frozen_string_literal: true

require "rails_helper"

RSpec.describe JSONWebToken, type: :poro do
  describe "Methods" do
    describe "#encode" do
      context "with a valid payload" do
        let(:payload) do
          { scope: "some_scope", sub: 1 }
        end

        it "encodes a payload to JWT" do
          expect(JSONWebToken.new.encode(payload: payload)).to_not be_nil
        end
      end

      context "with an invalid payload" do
        let(:payload) { {} }

        it "raises an exception" do
          expect { JSONWebToken.new.encode(payload: payload) }.
            to raise_error(JSONWebToken::TokenValidationError)
        end
      end
    end

    describe "#decode" do
      context "with a valid token" do
        let(:token) { JSONWebToken.new.encode(payload: { scope: "some_scope", sub: 1 }) }

        it "encodes a payload to JWT" do
          expect(JSONWebToken.decode(token)).to_not be_nil
        end
      end

      context "with an invalid token" do
        let(:token) { nil }

        it "raises an exception" do
          expect { JSONWebToken.decode(token) }.
            to raise_error(JSONWebToken::TokenError)
        end
      end
    end
  end
end
