class Brand < ActiveRecord::Base
  attr_accessible :contact_name, :description, :email, :latitude, :location, :logo, :longitude, :name, :phone_number, :user_id, :website
end
