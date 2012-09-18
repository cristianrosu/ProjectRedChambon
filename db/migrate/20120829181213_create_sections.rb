class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.integer :event_id
      t.string :name
      t.integer :type_id
      t.integer :position

      t.timestamps
    end
  end
end
