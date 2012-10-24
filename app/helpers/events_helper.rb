module EventsHelper

	#la asta trebuie renuntat. se va renda tot in event_block
	def block_content(block) 
		t = ""
		case block.type_id
		  when 1  #header
		  	t = "<h2>#{block.content}</h2>"
		  when 2  #text
		  	t = "<p>#{block.content}</p>"
		  when 3
		  	t = ""
		  when 4  #sponsorship
		  	t = render( partial: "event_block_sponsorship", locals: { sponsorships: block.details, block_id: block.id }, formats: [:html] )
		  when 5  
		  	t = "#{block.content}"		  
		  when 6
		  	t = "#{current_user.to_json}"
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
		  when 4
		  	t = "sponsorship"
		  when 5
		  	t = "media"
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
			when "sponsorship"
				return 4
			when "media"
				return 5
		end
		return 0
	end

	def section_image(section)
		case section.type_id
			when 1
				return "/assets/bubble/icon-sheet.png"
			when 2
				return "/assets/bubble/icon-volunteers.png"
			when 3
				return "/assets/bubble/icon-message.png"
			when 4
				return "/assets/bubble/icon-plus.png"
			when 5
				return "/assets/bubble/icon-sheet.png"
		end
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
		if !block.details.nil? && block.details.kind_of?(Hash) && block.details.has_key?(type.to_s) 
			toggle << "#{block.details[type.to_s]}"
		else
			#this should never be hit
			case type.to_s
				when "align"
					toggle << "align-left"
				when "size"
					toggle << "size-large"
			end 
		end
		return toggle.html_safe
	end

	def add_class_data_toggle(block)
		if block.nil? || block.details.blank? || !block.details.kind_of?(Hash)
			return
		end

		_block_type = block_type(block.type_id)
		class_text = " "

		block.details.each do |key, value|
			class_text << "#{_block_type}-#{value} "
		end

		return class_text.html_safe
	end

	def events_as_json(events)
	  events.collect do |event|
	    {
	      geometry: {
	      		type: "Point",
	      		coordinates: [event.longitude, event.latitude]
	      	},
	      properties: {
	      		:'marker-color' => get_industry_color(event.industry_id),
	      		id: event.id,
	      		title: event.title,
	      		feature_type: "event",
	      		description: event.description,
	      		industry: get_industry_name(event.industry),
	      		location: event.location,
	      		rating: event.rating,
	      		date_start: event.date_start,
	      		image: event.image_url().to_s
	      }
	    }
	  	end.to_json.html_safe
    end

    private
    def get_industry_color(industry_id)
    	color = ""
    	case industry_id.to_s
    		when "1"
    			color = "#A200FF"
    		when "2"
    			color = "#FF0097"
    		when "3"
    			color = "#00ABA9"
    		when "4"
    			color = "#8CBF26"
    		when "5"
    			color = "#1BA1E2"
    		when "6"
    			color = "#339933"	
    	end
    	return color
    end

	private
	def get_name(property, default_value)
		if property.nil? || property.name.nil? || property.name.blank?
			return default_value
		end
		return property.name
	end

	def get_industry_name(property)
		return get_name(property, "General")
	end

	def section_icon_class(type_id)
		t = ""
		case id
		  when 1
		  	t = "basic"
		  when 2
		  	t = "details"
		  when 3
		  	t = "sponsorship"
	  end	
	  return t
	end

	def symbolize_keys_deep!(h)
    h.keys.each do |k|
        ks    = k.respond_to?(:to_sym) ? k.to_sym : k
        h[ks] = h.delete k # Preserve order even when k == ks
        symbolize_keys_deep! h[ks] if h[ks].kind_of? Hash
    end
	end

	# def image_url(url)
	# 	if url.blank?
	# 		url = "no_image.jpg"
	# 	end
	# 	return File.join("/assets", url)
		
	# end

end
# "geometry": { "type": "Point", "coordinates": [-77.03, 38.90]},
#           "properties": {
#               "marker-color": "#000",
#               "marker-symbol": "star-stroked",
#               "image": "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/DCmontage4.jpg/250px-DCmontage4.jpg",
#               "url": "http://en.wikipedia.org/wiki/Washington,_D.C.",
#               "city": "Washington, D.C.",
#               "category": "awesome"
