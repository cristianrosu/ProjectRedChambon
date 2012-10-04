class EventsController < ApplicationController
  include EventsHelper
  # GET /events
  # GET /events.json
  before_filter :authenticate_user!, except: [:index]
  def index
    @events = Event.order(:id).page(params[:page]).per_page(3)

    # respond_to do |format|
    #   format.html # index.html.erb
    #   format.json { render json: @events }
    # end
  end

  def map

  end

  # GET /events/1
  # GET /events/1.json
  def show    
    @event = Event.find(params[:id], :include => [{:sections => :blocks}, :sections])

    @event.sections.each do |section|
      section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details).symbolize_keys
      end
    end
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @event }
    end
  end

  # GET /events/new
  # GET /events/new.json
  def new
    @event = Event.new #(title: "Awesome event", description: "tralala", sections: {Section.new(), Section.new()})
#Event.find(6, :include => [{:sections => :blocks}, :sections])


     respond_to do |format|
    #   format.html # new.html.erb
       #format.json { render partial: "new.json" } #render json: @event
       format.json { render json: {
            'mata' => 'test',
            'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
          }
        }
     end
  end

  # GET /events/1/edit
  def edit
    @event = Event.find(params[:id])
    respond_to do |format|
      format.json { render json: {
          'mata' => 'test',
          'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
        }
      }
    end
  end

  # GET /events/1/edit_step2
  def edit_step2
    @event = Event.find(params[:id], :include => [{:sections => :blocks}, :sections])

    @event.sections.each do |section|
      section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details).symbolize_keys
      end
    end

    respond_to do |format|
      format.json { render json: {
          'mata' => 'test',
          'workspace' => render_to_string(partial: "preview", locals: {event: @event}, formats: [:html])
        }
      }
    end
  end

  def create_block
    type_id = block_type_id(params[:type])
    @block = Block.new(type_id: type_id, section_id: params[:sectionId])
    if @block.save
      render partial: "event_block.html", locals: { block: @block, edit_mode: true } 
    else
      
    end
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(params[:event])
    @event.user_id = current_user.id

    @section_basic = Section.new(name: "Basic Info", type_id: 1, position: 1)
    @section_details = Section.new(name: "Details", type_id: 2, position: 2)
    @section_sponsorships = Section.new(name: "Sponsorships", type_id: 3, position: 3)

    @event.sections << @section_basic << @section_details << @section_sponsorships

    respond_to do |format|
      # if 
      @event.save
      #   format.html { render partial: "test" } #{ redirect_to @event, notice: 'Event was successfully created.' }
      #   format.json { render json: @event, status: :created, location: @event }
      #   format.js { render "test" }
      # else
      #   format.html { render action: "new" }
      #   format.json { render json: @event.errors, status: :unprocessable_entity }       format.json { render json: {
        format.json { render json: {
              'mata' => 'test',
              'eventId' => @event.id,
              'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
            }
          }
      # end
    end
  end

  # PUT /events/1
  # PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    respond_to do |format|
      #if
      @event.update_attributes(params[:event])
        format.json { render json: {
            'mata' => 'test',
            'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
          }
        }
      # else
      #   format.json { render json: @event.errors, status: :unprocessable_entity }
      # end
    end
  end

  def save_block
    @block = Block.find(params[:id])
    @block.update_attributes({
              content: params[:content], 
              position: params[:position],
              details: params[:details]})
    respond_to do |format|
      format.json { render json: @block }
    end
  end

  def save_block_order
    #@section = Section.find(params[:id], :include => [:blocks])
    old_order = params[:oldOrder].to_i
    new_order = params[:newOrder].to_i

    #block_1 = @section.blocks[@section.blocks.index{|block| block.id == old_order}]
    #block_2 = @section.blocks[@section.blocks.index{|block| block.id == new_order}]3
    block_1 = Block.where(section_id: params[:id]).where(position: params[:oldOrder]).first
    block_2 = Block.where(section_id: params[:id]).where(position: params[:newOrder]).first

    if block_1.nil? || block_2.nil?
      render json: {'error' => "could not save"} and return
    end

    block_1.position = new_order
    block_2.position = old_order
    block_1.save
    block_2.save

    render json: {'error' => 0} 
  end

  # def upload
  #   @event = Event.find(params[:id])
  #   respond_to do |format|
  #     if @event.update_attributes(params[:image])
  #       format.html { render text: @event.image_url(:thumb) }
  #     else
  #       format.html { render text: "am belit-o" }
  #     end
  #   end
  # end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event = Event.find(params[:id])
    @event.destroy

    respond_to do |format|
      format.html { redirect_to events_url }
      format.json { head :no_content }
    end
  end

end
