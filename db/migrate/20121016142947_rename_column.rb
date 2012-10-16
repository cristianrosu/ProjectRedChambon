class RenameColumn < ActiveRecord::Migration
  def up
  	rename_column :sponsorships, :user_id, :brand_id
  end

  def down
  	rename_column :sponsorships, :brand_id, :user_id
  end
end
