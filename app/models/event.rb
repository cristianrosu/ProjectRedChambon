class Event < ActiveRecord::Base

  belongs_to :user
  belongs_to :industry
  has_many :sections

  attr_accessible :date_end, :date_start, :description, :industry_id, :location, :rating, :title, :user_id

  validate :date_cannot_be_in_the_past
  validates :title, :presence => true

  def date_cannot_be_in_the_past
    if !date_start.blank? and date_start < Date.today
      errors.add(:date_start, "can't be in the past")
    end
    if !date_end.blank? and date_end < Date.today
      errors.add( :date_end, "can't be in the past")
    end
  end


end
