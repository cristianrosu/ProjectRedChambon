class Block < ActiveRecord::Base

  belongs_to :section

  attr_accessible :content, :position, :section_id, :type_id, :details

  after_initialize :init

  def init
  	self.type_id ||= 2

		case self.type_id
		  when 1
		  	self.content = "<h1>Title</h1>"
		  when 2
		  	t = "You can write here anything you want..."
		  when 3
		  	t = "image"
	  end	
	  return t
	end

    # self.number  ||= 0.0           #will set the default value only if it's nil
    # self.address ||= build_address #let's you set a default association
	
end

# after_create :create_training_records

# private
# def create_training_records
#   create_theoretical_instructors.each do |instructor_id|
#     self.theoretical_instructors << Instructor.find(instructor_id)
#   end
#   create_practical_instructors.each do |instructor_id|
#     self.practical_instructors << Instructor.find(instructor_id)
#   end
#   save!
# end


class BlockType
  HEADER=1
  TEXT=2
  IMAGE=3
  BADGE=5
end