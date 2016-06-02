# Insightful App
WDI05 Project 3

<img src="http://i.imgur.com/DrITw2i.png" alt="logo">  

###About

Insightful aggregates text and pushes it into the Watson PI API, this allows us to describe the personality of a group of people talking about a trending twitter topic, user or string, or generally any text (1000 character - 25000 character) entered by the user. A switch at the bottom will allow you to select Twitter or other. The produced personalities are transformed into Myers Briggs types, and visualized via D3 tools. If a user logs in using our validated login we’ll give the option of saving previous personality profiles, showing recent profiles and commenting on them.


###Installation

The Social Personality App inputs text into the REST API on the IBM Watson™ Developer Cloud, and allow you to view and favorite these results. To enable the API, you have to register for the IBM Bluemix™ beforehand, make the services effective, and relate them to your ENV file. 
<ol>
	<li> Register with Bluemix at: http://www.ibm.com/cloud-computing/bluemix/
*Be sure to complete registration all the way through to account validation for email address.* </li>
	<li> Login to Bluemix – click 'Use Services or APIs'</li>
	<li> Create a Personality Insights Service (name doesn’t matter)</li>
	<li> Click Service Credentials to see your key</li>
	<li> Go back to project and create a .env file in the main project folder</li>
	<li> Copy the example from .env.example into your .env</li>
	<li> Input your key from Bluemix</li>
	<li> Optional: To conserve your 100 searches/month, comment out the search call in personalities_controller</li>
</ol>

To get info from Twitter you need to activate the Twitter API:
<ol>
	<li> Register with Twitter</li>
	<li> Visit https://apps.twitter.com and “Create new app”</li>
	<li> Fill out form and submit, “Callback URL” isn’t necessary </li>
	<li> In application details click “Manage keys and access tokens”</li>
	<li> Copy Key & Secret into your .env (mirroring the .env.example)</li>
	<li> Click “Create my access token” to get the API Key & Secret</li>
</ol>
Now bundle install & rake db:migrate, and go!

###Tech

Front end:
SCSS, Bootstrap, Javascript, CSS, ajax, D3

Back end:
Ruby, Rails 

APIs:
Watson PI, Twitter

Gems:
Devise, Watson-API-Client, Twitter, Bootstrap-Form, D3js, Skrollr, Puma

URL: insightful-app.herokuapp.com
User stories: https://trello.com/b/i26K2Y39/social-personality-app
Repository: https://github.com/erikapallasmoore/Social_Personality_App
Wire frames: https://moqups.com/chibitofu/W8Ly9GVh
