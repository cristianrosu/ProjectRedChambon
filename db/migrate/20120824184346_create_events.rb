class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.date :date_start
      t.date :date_end
      t.string :location
      t.integer :rating
      t.integer :industry_id
      t.integer :user_id

      t.timestamps
    end
  end
end
