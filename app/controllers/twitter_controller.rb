class TwitterController < ApplicationController
  def index
  end

  def search
		client = Twitter::REST::Client.new do |config|
		 	config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
			config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
			config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
			config.access_token_secret = ENV["TWITTER_ACCESS_TOKEN_SECRET"]
		end

		@results = []
		client.search(params[:q], result_type: "recent").take(5).collect do |tweet|
  		@results << "#{tweet.user.screen_name}: #{tweet.text}"
		end
  	
  end

  def results

  end
end