module SponsorshipsHelper
	def sponsorships_as_json(sponsorships)
    	sponsorships.collect do |sponsorship|
    		{
    			geometry: {
    				type: "Point",
    				coordinates: [sponsorship.longitude, sponsorship.latitude]
    			},
    			properties: {
    				:'marker-color' => get_industry_color(sponsorship.industry_id),
    				id: sponsorship.id,
    				title: sponsorship.title,
                    feature_type: "sponsorship",
    				description: sponsorship.description,
    				industry: get_industry_name(sponsorship.industry),
    				location: sponsorship.location,
    				date_start: sponsorship.date_start
    			}
    		}
    	end.to_json.html_safe
    end
end
