class Picture < ActiveRecord::Base
	belongs_to :imageable, :polymorphic => true

  attr_accessible :imageable_id, :imageable_type, :name, :image

  mount_uploader :image, ImageUploader
end
