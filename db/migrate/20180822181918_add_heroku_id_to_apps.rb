class AddHerokuIdToApps < ActiveRecord::Migration[5.2]
  def change
    add_column :apps, :heroku_id, :integer
  end
end
