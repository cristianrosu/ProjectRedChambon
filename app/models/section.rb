class Section < ActiveRecord::Base

  has_many :blocks, :order => 'position ASC'
  belongs_to :event

  attr_accessible :event_id, :name, :position, :type_id

end


class SectionType

  BASIC_INFO=1
  DETAILS=2
  SPONSORSHIPS=3
  PARTICIPANTS=4
  SPEAKERS=5
  VOLUNTEERS=6

end