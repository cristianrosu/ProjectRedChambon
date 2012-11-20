class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.integer :user_id
      t.string :provider
      t.string :uid
      t.string :uname
      t.string :email
      t.string :oauth_token
      t.datetime :oauth_expires_at

      t.timestamps
    end
  end
end
