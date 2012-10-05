module EventsHelper

	def block_content(block)
		t = ""
		case block.type_id
		  when 1  #header
		  	t = "#{block.content}"
		  when 2  #text
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
	
	def block_type_id(type)
		case type
			when "header"
				return 1
			when "text"
				return 2
			when "image"
				return 3
		end
		return 0
	end


	#details is a hash of toggles
	#ex: {"align"=>"align-justify"} 
	#calling with type="align"
	#will render: data-field="align" data-value="align-center"
	def data_toggle_decode(block, type)
		if block.nil? || type.nil?
			return
		end
		toggle = ""
		toggle << "data-field=\"#{type}\" data-value=\""
		toggle << data_toggle_value(block, type)
		toggle << "\""
		return toggle.html_safe
	end

	def data_toggle_value(block, type)
		if block.nil? || type.nil?
			return
		end
		toggle = ""
		if !block.details.nil? && block.details.has_key?(type) 
			toggle << "#{block.details[type]}"
		else
			case type
				when "align"
					toggle << "align-left"
				when "size"
					toggle << "size-large"
			end 
		end
		return toggle.html_safe
	end

	def add_class_data_toggle(block)
		if block.nil? || block.details.nil? 
			return
		end

		_block_type = block_type(block.type_id)
		class_text = " "

		block.details.each do |key, value|
			class_text << "#{_block_type}-#{value} "
		end

		return class_text.html_safe
	end

end
