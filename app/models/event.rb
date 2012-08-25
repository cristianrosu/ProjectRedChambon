class Event < ActiveRecord::Base
  attr_accessible :date_end, :date_start, :description, :industry_id, :location, :rating, :title, :user_id
end
