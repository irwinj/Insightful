class PersonalitiesController < ApplicationController

  def toggle_favorite
    personality_id = params[:id].to_i
    personality = Personality.find(personality_id)

    if current_user.personality_ids.include? personality_id
      current_user.personalities.delete personality
    else
      current_user.personalities << personality
    end

    render :json => { :status => "ok" }
  end

  def index
  end

  def recent
    @recent = Personality.last(25).reverse
  end

  def show
    @params_id = params[:id]
    @personality = Personality.find(params[:id])

    @comment = Comment.new 
    @comments = Comment.where(personality: @personality)
    # @comments = @personality.comments

    respond_to do |format|
      format.html
      if @personality
        format.json {render json: @personality}
      end
    end
  end

  def twitter_search

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_TOKEN_SECRET"]
    end
  
    begin
      text = client.search(params[:q], result_type: "recent", :count => 200).map(&:text).join("\n")
      # logger.debug(text.length) 
    rescue StandardError => error
      return redirect_to :back, alert: "Oops, there was a twitter error: #{error}"
    else
      service = WatsonAPIClient::PersonalityInsights.new(:user=>ENV["WATSON_USERNAME"],
                                                     :password=>ENV["WATSON_PASSWORD"],
                                                     :verify_ssl=>OpenSSL::SSL::VERIFY_NONE)

      begin 
        service.profile(
          'Content-Type'     => "text/plain",
          'Accept'           => "application/json",
          'Accept-Language'  => "en",
          'Content-Language' => "en",
          'body'             => text)
      rescue StandardError => error
        return redirect_to :back, alert: "Oops, there was a Watson error (probably not enough words): #{error}"
      end
    end

  end

  def search
    watson_result(params[:title], params[:q])
  end

  private

  def watson_result(title, text)
    new_record = Personality.new
    new_record.data = watson_search(text)
    new_record.input = text
    new_record.title = title
    new_record.save
    redirect_to new_record
  end
end
