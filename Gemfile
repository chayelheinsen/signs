# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.1"

gem "activerecord-nulldb-adapter"
gem "attr_encrypted", "~> 3.0.0"
gem "axios_rails", "~> 0.7.0"
gem "bcrypt", "~> 3.1.7"
gem "bootsnap", ">= 1.1.0", require: false
gem "fast_jsonapi"
gem "forerunner"
gem "httparty"
gem "interactor-rails"
gem "jquery-rails", ">= 4.0"
gem "jwt"
gem "materialize-sass", "~> 1.0.0.rc2"
gem "mini_racer"
gem "pg", ">= 0.18", "< 2.0"
gem "platform-api"
gem "puma", "~> 3.11"
gem "rails", "~> 5.2.1"
gem "react-rails"
gem "redis", "~> 4.0"
gem "sassc-rails"
gem "uglifier", ">= 1.3.0"

group :development, :test do
  gem "annotate"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv-rails"
  gem "factory_bot_rails"
  gem "faker"
  gem "pry"
  gem "pry-rails"
  gem "rspec-rails"
  gem "rspec_junit_formatter"
  gem "rubocop"
end

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem "letter_opener"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :test do
  gem "capybara", ">= 2.15"
  gem "chromedriver-helper"
  gem "json_matchers"
  gem "selenium-webdriver"
  gem "sinatra", "~> 2.0.2"
  gem "webmock"
end

gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]
