module ApplicationHelper

	def get_fb_friends(user)
		if user.nil? || user.provider != "facebook"
			user = User.where("email = ? AND provider = ?", "sucalas_lab@yahoo.com", "facebook").first
		end
		return user.facebook.get_connection("me", "friends")
	rescue Koala::Facebook::APIError
  	logger.info e.to_s
  	e.to_s
	end
	
end
