class AddDetailsToBlock < ActiveRecord::Migration
  def change
    add_column :blocks, :details, :string
  end
end
