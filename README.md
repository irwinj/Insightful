# Social-Personality-App
Social Personality App - WDI05 Project 3
Preparation

Devise gem used for login/logout, etc.

The Social Personality App inputs text into the REST API on the IBM Watson™ Developer Cloud, and allow you to view and favorite these results. To enable the API, you have to register for  the IBM Bluemix™ beforehand, make the services effective, and relate them to your ENV file. 

1) Register with bluemix at: http://www.ibm.com/cloud-computing/bluemix/
Be sure to complete registration all the way through to account validation for email address.
2) Login to Bluemix – click Use Services or APIs
3) Create a Personality Insights Service (name doesn’t matter)
4) Click Service Credentials to see your key
5) Go back to project and create a .env file in the main project folder
6) Copy the example from .env.example into your .env
7) Input your key from bluemix
8) If you want to save your 100 searches/month, comment out the search call in personalities_controller

To do search results from Twitter you need to activate the Twitter API:
1)	Register with Twitter
2)	Visit https://apps.twitter.com and “Create new app”
3)	Fill out form and submit, “Callback URL” isn’t necessary
4)	In application details click “Manage keys and access tokens”
5)	Copy Key & Secret into your .env (mirroring the .env.example)
6)	Click “Create my access token” to get the API Key & Secret
