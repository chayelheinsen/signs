# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_22_181918) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apps", force: :cascade do |t|
    t.string "name", null: false
    t.string "type", default: "None"
    t.string "region", default: ""
    t.string "server", default: ""
    t.boolean "favorite", default: false
    t.integer "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "heroku_id"
    t.index ["name"], name: "index_apps_on_name", unique: true
  end

  create_table "user_apps", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "app_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["app_id"], name: "index_user_apps_on_app_id"
    t.index ["user_id"], name: "index_user_apps_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_heroku_token", null: false
    t.string "encrypted_heroku_token_iv", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "user_apps", "apps"
  add_foreign_key "user_apps", "users"
end
