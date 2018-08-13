# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "pages#root"
  get "*unmatched_route", to: "pages#root"
end
