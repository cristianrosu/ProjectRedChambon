class AdminController < ApplicationController

  before_filter :authenticate_user!
  def index
    @events = Event.find_all_by_user_id(current_user.id)

    respond_to do |format|
      format.html  #index.html.erb
      format.json { render json: @events }
    end
  end
end
