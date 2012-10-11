class Industry < ActiveRecord::Base
  has_many :events
  has_many :sponsorships
  attr_accessible :name

end
