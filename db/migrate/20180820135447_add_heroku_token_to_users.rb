class AddHerokuTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :encrypted_heroku_token, :string, null: false
    add_column :users, :encrypted_heroku_token_iv, :string, null: false
  end
end
