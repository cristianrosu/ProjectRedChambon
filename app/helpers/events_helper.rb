module EventsHelper

	def block_content(block)
		t = ""
		case block.type_id
		  when 1
		  	t = "#{block.content}"
		  when 2
		  	t = "#{block.content}"
		  when 3
	  end	
	 	return t.html_safe
	end

	def block_type(id)
		t = ""
		case id
		  when 1
		  	t = "header"
		  when 2
		  	t = "text"
		  when 3
		  	t = "image"
	  end	
	  return t
	end

end
