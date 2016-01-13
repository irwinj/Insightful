class PersonalitiesController < ApplicationController
  # before_action :authenticate_user!
  def create
  end

  def update
  end

  def edit
  end

  def destroy
  end

  def index
  end

  def recent
    @recent = Personality.last(2).reverse
  end

  def results
    @params_id = params[:id]
    @watson = Personality.find(params[:id])
    respond_to do |format|
      format.html
      if @watson
        format.json {render json: @watson}
      end
    end
  end

  def show
  end

  def twitter_search

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_TOKEN_SECRET"]
    end

    text = client.search(params[:q], result_type: "recent").map(&:text).join("\n")

    watson_result(params[:q], text)

  end

  def search
    watson_result(params[:title], params[:q])
  end

  private

  def watson_search(text)
    service = WatsonAPIClient::PersonalityInsights.new(:user=>ENV["WATSON_USERNAME"],
                                                         :password=>ENV["WATSON_PASSWORD"],
                                                         :verify_ssl=>OpenSSL::SSL::VERIFY_NONE)
    logger.debug(text)
    service.profile(
      'Content-Type'     => "text/plain",
      'Accept'           => "application/json",
      'Accept-Language'  => "en",
      'Content-Language' => "en",
      'body'             => text)
  end

  def watson_result(title, text)
    new_record = Personality.new
    new_record.data = watson_search(text)
    new_record.input = text
    new_record.title = title
    new_record.save

    @last_record = Personality.last
    @params_id = @last_record.id
    @watson = @last_record
    render "personalities/results"
  end

end
