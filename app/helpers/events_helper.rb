module EventsHelper

	def block_tag(block, edit_mode)
		html = "<li id=\"bk_#{block.id}\" class=\"element #{ block_type(block.type_id) }\"  >"
		
		if edit_mode
			html << render("events/event_block_edit_toolbox.html")

			html << "<textarea id=\"bk_body_#{block.id}\" class=\"\" style=\"display: none;\" >"
			html << "#{block_content(block)}"
			html << "</textarea>"
		else
			html << "<div id=\"bk_body_#{block.id}\" class=\"\" >"
			html << "#{block_content(block)}"
			html << "</div>"
		end

	  html << "</li>"
	  return  html.html_safe 	
	end

	private
	def block_content(block)
		t = ""
		case block.type_id
		  when 1
		  	t = "<h1>#{block.content}</h1>"
		  when 2
		  	t = "<p>#{block.content}</p>"
		  when 3
	  end	
	 	return t
	end

	private
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
