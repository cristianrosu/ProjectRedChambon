class CreateSponsorships < ActiveRecord::Migration
  def change
    create_table :sponsorships do |t|
      t.string :title
      t.text :description
      t.date :date_start
      t.date :date_end
      t.string :location
      t.float :latitude
      t.float :longitude
      t.integer :sponsorship_type_id
      t.integer :industry_id
      t.string :image

      t.timestamps
    end
  end
end
