class Block < ActiveRecord::Base

  belongs_to :section

  attr_accessible :content, :position, :section_id, :type_id, :details

  # after_initialize :init
  before_create :init

  private
  def init
  	self.type_id ||= 2
  	cont = ""
    _details = "{}"
		case self.type_id
		  when 1
		  	cont = "<h1>Title</h1>"
        _details = {align: "align-left", size: "size-large"}.to_json #{"align"=>"align-left", "size"=>"size-large"}
		  when 2
		  	cont = "You can write here anything you want..."
        _details = {align: "align-left"}.to_json #{"align":"align-left"}
		  when 3
		  	cont = "image"
      when 4
        cont = ""
        _details = [
            { title: "Sponsorship", 
              count: 3, value: 400, 
              description: "I need a space on 28-29 Sept, big enougth for 500 people or the equivalent in money."
            }
          ].to_json
      when 5
        cont = ""
        _details = "{}"      

      when 6
        cont = ""
        _details = "{}"
	  end	
    self.content = cont if self.content.nil?
    self.details = _details if self.details.nil?
	  #save!
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
  SPONSORSHIP=4
  BADGE=5
  FRIENDS=6
end