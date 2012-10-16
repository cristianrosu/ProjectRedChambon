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
    @events = Event.all
    @features_as_json = events_as_json(@events)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @features_as_json }
    end
  end

  # GET /events/1
  # GET /events/1.json
  def show    
    @event = Event.find(params[:id], :include => [{:sections => :blocks}, :sections, :industry])

    @event.sections.each do |section|
      section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details)
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
       format.html # new.html.erb
       #format.json { render partial: "new.json" } #render json: @event
       # format.json { render json: {
       #      'mata' => 'test',
       #      'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
       #    }
       #  }
     end
  end

  # GET /events/1/edit
  def edit

    @event = Event.find(params[:id], :include => [{:sections => :blocks}, :sections, :industry])

    @event.sections.each do |section|
      section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details)
      end
    end

    respond_to do |format|
      format.html 
      # format.json { render json: {
      #       'mata' => 'test',
      #       'action' => 'edit',
      #       'eventId' => @event.id,
      #       'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
      #     }
      # }
    end

    # @event = Event.find(params[:id])
    # respond_to do |format|
    #   format.html { render }
    #   format.json { render json: {
    #       'mata' => 'test',
    #       'action' => 'edit',
    #       'eventId' => @event.id,
    #       'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
    #     }
    #   }
    # end
  end

  # GET /events/1/edit_step2
  def edit_step2
    @event = Event.find(params[:id], :include => [{:sections => :blocks}, :sections])

    @event.sections.each do |section|
      section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details)
      end
    end

    respond_to do |format|
      format.json { render json: {
          'mata' => 'test',
          'action' => 'edit_step2',
          'eventId' => @event.id,
          'workspace' => render_to_string( partial: "show", locals: { event: @event, edit_mode: false }, formats: [:html])
        }
      }
    end
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(params[:event])
    @event.title = "Event title"
    @event.description = "Awesome description for your event"
    @event.date_start = Date.today + 10.days;
    @event.date_end = Date.today + 12.days;

    @event.user_id = current_user.id

    @section_basic = Section.new(name: "Details", type_id: 1, position: 1)
    @section_details = Section.new(name: "People", type_id: 2, position: 2)
    @section_sponsorships = Section.new(name: "Sponsorships", type_id: 3, position: 3)

    @event.sections << @section_basic << @section_details << @section_sponsorships


    @block1 = Block.new(type_id: 1, position: 0)
    @block11 = Block.new(type_id: 2, position: 1)
    @section_basic.blocks << @block1 << @block11
    @block2 = Block.new(type_id: 1, position: 0)
    @block22 = Block.new(type_id: 2, position: 1)
    @section_details.blocks << @block2 << @block22
    @block3 = Block.new(type_id: 1, position: 0)
    @block33 = Block.new(type_id: 2, position: 1)
    @section_sponsorships.blocks << @block3 << @block33

    respond_to do |format|
      if @event.save
      #   format.html { render partial: "test" } #{ redirect_to @event, notice: 'Event was successfully created.' }
      #   format.json { render json: @event, status: :created, location: @event }
      #   format.js { render "test" }
      # else
        format.html { redirect_to edit_event_path(@event) }
      #   format.json { render json: @event.errors, status: :unprocessable_entity }       format.json { render json: {
        # format.json { render json: {
        #       'mata' => 'test',
        #       'action' => 'edit',
        #       'eventId' => @event.id,
        #       'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
        #     }
        #   }
      else
        format.html { render text: "am futut-o" }
      end
    end
  end

  # PUT /events/1
  # PUT /events/1.json
  def update
    @event = Event.find(params[:id], :include => [{:sections => :blocks}, :sections])

    @event.sections.each do |section|
      section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details)
      end
    end

    respond_to do |format|
      if @event.update_attributes(params[:event])
        format.html { redirect_to edit_event_path(@event) }
        format.json { render json: {
            'mata' => 'test',
            'edit_guidelines' => render_to_string( partial: "edit_guidelines", locals: { edit_mode: true }, formats: [:html]),
            'edit_basic' => render_to_string( partial: 'edit_basic', locals: { event: @event }, formats: [:html]),
            'event_show' => render_to_string( partial: "show", locals: { event: @event, edit_mode: true }, formats: [:html])
          }
        }
      else
        format.html { render text: "am futut-o" }
      end
    end
  end

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


######################
# Block operations
######################

  def create_block
    type_id = block_type_id(params[:type])
    @block = Block.new(type_id: type_id, section_id: params[:sectionId])
    if @block.save
      @block.details =  ActiveSupport::JSON.decode(@block.details)
      render partial: "event_block.html", locals: { block: @block, edit_mode: true } 
      #render json: @block
    else
      
    end
  end

  def create_section
    @section = Section.new(params[:section])

    @block1 = Block.new(type_id: 1, position: 0)
    @block11 = Block.new(type_id: 2, position: 1)
    @section.blocks << @block1 << @block11

    if @section.save
      @section.blocks.each do |block|
        block.details =  ActiveSupport::JSON.decode(block.details)
      end

      render json: { 'new_section' => render_to_string( partial: "event_section", locals: { event_section: @section, edit_mode: true, new_object: true }, formats: [:html]) }

    else
      render text: "error"
    end
  end

  def create_sponsorship_block
    type_id = block_type_id(params[:type])
    @block = Block.new(type_id: type_id, section_id: params[:sectionId])
    if @block.save
      render partial: "event_block.html", locals: { block: @block, edit_mode: true } 
    else
      
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

  def destroy_block
    @block = Block.find(params[:id]);
    
    @block.delete
    @blocks = Block.select("id, position").where("section_id = ? AND position > ?", @block.section_id, @block.position)
    
    @blocks.each do |bl|
      bl.decrement!(:position)
    end
    render json: { "error" => 0 } and return

  rescue
    render json: { "error" => 1, "description" => "Could not delete block" } and return

  end

  private
  def fix

    
    blocks = Block.all(:conditions => "section_id IS NULL ")
    blocks.each do |block|
      block.delete
    end    

    #fix empty dates
    events = Event.all(:conditions => "date_start IS NULL OR date_end IS NULL")
    events.each do |event|
      event.date_start = Date.today + 10.days;
      event.date_end = Date.today + 12.days;
      event.save
    end 

    sections = Section.all
    sections.each do |section|
      blocks = Block.where("section_id = ?", section.id).order("position ASC")
      i = 0
      blocks.each do |block|
        block.position = i
        block.save
        i = i + 1
      end
    end

  end



end
