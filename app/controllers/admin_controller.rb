class AdminController < ApplicationController

  before_filter :authenticate_user!
  def index
    @events = Event.find_all_by_user_id(current_user.id)
    
    respond_to do |format|
      format.html  #index.html.erb
      format.json { render json: @events }
    end
  end

  def new
    @event = Event.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
  end


  def volunteers
    render json: { 'workspace' => render_to_string(partial: "volunteers.html")}
  end

   def sponsors
    render json: { 'workspace' => render_to_string(partial: "sponsors.html")}
  end

end
