class CreateBlocks < ActiveRecord::Migration
  def change
    create_table :blocks do |t|
      t.integer :section_id
      t.integer :type_id
      t.text :content
      t.integer :position

      t.timestamps
    end
  end
end
