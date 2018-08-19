# frozen_string_literal: true

Rails.application.routes.draw do
  # root to: "home#index"
  root to: "sessions#new"

  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  get "logout", to: "sessions#destroy"

  resources :dashboard, only: %i[index]
  resources :users, only: %i[new create]

  namespace :api do
    resources :apps, only: %i[create update]
  end
end
