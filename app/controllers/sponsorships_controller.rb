class SponsorshipsController < ApplicationController
  # GET /sponsorships
  # GET /sponsorships.json
  include SponsorshipsHelper
  include EventsHelper
  def index
    @sponsorships = Sponsorship.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @sponsorships }
    end
  end

  # GET /sponsorships/1
  # GET /sponsorships/1.json
  def show
    @sponsorship = Sponsorship.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @sponsorship }
    end
  end

  def map

    @sponsorships = Sponsorship.all
    @features_as_json = sponsorships_as_json(@sponsorships)

    respond_to do |format|
      format.html { render action: "../events/map" }
      format.json { render json: @features_as_json }
    end

    
  end

  # GET /sponsorships/new
  # GET /sponsorships/new.json
  def new
    @sponsorship = Sponsorship.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @sponsorship }
    end
  end

  # GET /sponsorships/1/edit
  def edit
    @sponsorship = Sponsorship.find(params[:id])
  end

  # POST /sponsorships
  # POST /sponsorships.json
  def create
    @sponsorship = Sponsorship.new(params[:sponsorship])

    respond_to do |format|
      if @sponsorship.save
        format.html { redirect_to @sponsorship, notice: 'Sponsorship was successfully created.' }
        format.json { render json: @sponsorship, status: :created, location: @sponsorship }
      else
        format.html { render action: "new" }
        format.json { render json: @sponsorship.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /sponsorships/1
  # PUT /sponsorships/1.json
  def update
    @sponsorship = Sponsorship.find(params[:id])

    respond_to do |format|
      if @sponsorship.update_attributes(params[:sponsorship])
        format.html { redirect_to @sponsorship, notice: 'Sponsorship was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @sponsorship.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sponsorships/1
  # DELETE /sponsorships/1.json
  def destroy
    @sponsorship = Sponsorship.find(params[:id])
    @sponsorship.destroy

    respond_to do |format|
      format.html { redirect_to sponsorships_url }
      format.json { head :no_content }
    end
  end
end
