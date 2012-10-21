class PicturesController < ApplicationController

	def index

	end

	def create
		@picture = Picture.new(params[:picture])
		if @picture.save
			render json: @picture 
		else
			render json: { error: 1, details: "" }
		end

	end

	def destroy

	end

end
