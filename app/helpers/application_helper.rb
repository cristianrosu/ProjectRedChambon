module ApplicationHelper

	def get_fb_friends(user)
		if user.nil? || user.provider != "facebook"
			user = User.where("email = ? AND provider = ?", "sucalas_lab@yahoo.com", "facebook")
		end
		return user.facebook.get_connection("me", "friends")
	end
	
end
