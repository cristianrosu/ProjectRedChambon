class AddDetailsToBlocks < ActiveRecord::Migration
  def change
    change_column :blocks, :details, :text
  end
end
