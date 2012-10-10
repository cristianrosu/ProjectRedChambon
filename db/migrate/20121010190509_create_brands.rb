class CreateBrands < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :name
      t.text :description
      t.string :email
      t.string :logo
      t.string :phone_number
      t.string :website
      t.string :location
      t.float :latitude
      t.float :longitude
      t.string :contact_name
      t.integer :user_id

      t.timestamps
    end
  end
end
