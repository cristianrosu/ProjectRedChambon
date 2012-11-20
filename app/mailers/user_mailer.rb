class UserMailer < ActionMailer::Base
  default from: "contact@theseedbit.com"

  def welcome()
  	mail(to: "sucalas_lab@yahoo.com", subject: "teeest") do |format|
  		format.html
  	end


  end
end
