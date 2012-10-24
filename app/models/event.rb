class Event < ActiveRecord::Base

  attr_accessible :date_end, :date_start, :description, :industry_id, :location, :rating, :title, :user_id, :image, :latitude, :longitude, :tag_list, :pictures

  belongs_to :user
  belongs_to :industry
  belongs_to :event_type
  has_many :sections, :order => 'position ASC', :dependent => :destroy
  has_many :blocks, :through => :sections
  has_many :pictures, :as => :imageable, :dependent => :destroy

  accepts_nested_attributes_for :pictures
  before_create :init
  acts_as_taggable

  # mount_uploader :image, ImageUploader

  #validate :date_validation
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

    

  private
  def init
    self.image = "/assets/no_event_image.jpg" if self.image.blank?
  end

  # private
  # def init
  #   self.date_start = Date.today + 10.days if self.date_start.nil?
  #   self.date_end = Date.today + 10.days if self.date_end.nil?
  # end


end
