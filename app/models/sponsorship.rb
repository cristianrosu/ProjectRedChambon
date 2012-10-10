class Sponsorship < ActiveRecord::Base
  
  belongs_to :user

  attr_accessible :date_end, :date_start, :description, :image, :industry_id, :latitude, :location, :longitude, :sponsorship_type_id, :title
end
