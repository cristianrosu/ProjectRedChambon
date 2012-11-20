class Service < ActiveRecord::Base
  attr_accessible :email, :oauth_expires_at, :oauth_token, :provider, :uid, :uname, :user_id
end
