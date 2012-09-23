class Block < ActiveRecord::Base

  belongs_to :section

  attr_accessible :content, :position, :section_id, :type_id

end


class BlockType
  HEADER=1
  TEXT=2
  IMAGE=4
  BADGE=5
end