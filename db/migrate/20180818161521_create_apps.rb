class CreateApps < ActiveRecord::Migration[5.2]
  def change
    create_table :apps do |t|
      t.string :name, null: false
      t.string :type, default: "None"
      t.string :region, default: ""
      t.string :server, default: ""
      t.boolean :favorite, default: false
      t.integer :owner_id, foreign_key: true

      t.timestamps
    end
  end
end
