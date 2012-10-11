class AddUserIdToSponsorships < ActiveRecord::Migration
  def change
    add_column :sponsorships, :user_id, :integer
  end
end
