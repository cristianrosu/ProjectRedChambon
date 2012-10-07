class Event < ActiveRecord::Base

  belongs_to :user
  belongs_to :industry
  belongs_to :event_type
  has_many :sections, :order => 'position ASC'

  attr_accessible :date_end, :date_start, :description, :industry_id, :location, :rating, :title, :user_id, :image
  
  mount_uploader :image, ImageUploader

  validate :date_validation
  #validates :title, :presence => true

  def date_validation
    if !date_start.blank? and date_start < Date.today
      errors.add(:date_start, "can't be in the past")
    end
    if !date_end.blank? and date_end < Date.today
      errors.add( :date_end, "can't be in the past")
    end
    #if !date_start.blank? and !date_end.blank?
  end


end
