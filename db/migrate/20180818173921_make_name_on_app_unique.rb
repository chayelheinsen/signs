class MakeNameOnAppUnique < ActiveRecord::Migration[5.2]
  def change
    add_index :apps, :name, unique: true
  end
end
