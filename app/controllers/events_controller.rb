class EventsController < ApplicationController
  # GET /events
  # GET /events.json
  before_filter :authenticate_user!, except: [:index]
  def index
    @events = Event.order(:id).page(params[:page]).per_page(2)

    # respond_to do |format|
    #   format.html # index.html.erb
    #   format.json { render json: @events }
    # end
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
          'workspace' => render_to_string(partial: "preview.html", locals: {event: @event})
        }
      }
    end
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(params[:event])
    @event.user_id = current_user.id

    respond_to do |format|
      if @event.save
      #   format.html { render partial: "test" } #{ redirect_to @event, notice: 'Event was successfully created.' }
      #   format.json { render json: @event, status: :created, location: @event }
      #   format.js { render "test" }
      # else
      #   format.html { render action: "new" }
      #   format.json { render json: @event.errors, status: :unprocessable_entity }       format.json { render json: {
        format.json { render json: {
              'mata' => 'test',
              'workspace' => render_to_string(partial: "new.html", locals: {event: @event})
            }
          }
      end
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
