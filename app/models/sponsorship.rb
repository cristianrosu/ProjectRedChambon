class Sponsorship < ActiveRecord::Base
  
  belongs_to :brand
  belongs_to :industry

  attr_accessible :date_end, :date_start, :description, :image, :industry_id, :latitude, :location, :longitude, :sponsorship_type_id, :title
end
