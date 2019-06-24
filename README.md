# ESP8266 IFTTT Weather Google
How to connect ESP8266 to Google spreadsheet and reading the Weather conditions published IFTTT.

In the first time you need to configure a applet on the IFTTT service that get the weather condition and put the data in a google spreadsheet used as repository.

## Step 1
Configure the IFTTT service applet to log the weather condition info in a Google Spreadsheet:

<img src="./image/IFTTT Weather Google spreadsheet search.jpg" alt="IFTTT Weather Google spreadsheet search" width="300">

## Step 2
Configure the log weather google doc spreadsheet appl:
<img src="./image/IFTTT Weather Google spreadsheet weather configure.jpg" alt="IFTTT Weather Google spreadsheet search" width="300">

Add your preferred time of day and city of that you need to receive the weather condition.

In the end of configuration applet you'll customize the data format, column and order which it writes the lines in the spreadsheet. 

## Step 3
Check the spreadsheet data after a few days:

<img src="./image/IFTTT Weather Google script sheet data.jpg" alt="IFTTT Weather Google script sheet data" width="600">

Yuo'll view one line for each day of execution.

## Step 4
Logon in your Google account and make a new Google Script:

<img src="./image/IFTTT Weather Google script project.jpg" alt="IFTTT Weather Google script project" width="600">

Paste the code of "GoogleSheetESP8266.gs":

<img src="./image/IFTTT Weather Google script code.jpg" alt="IFTTT Weather Google script code" width="600">

and customize the document ID: replace the value of .openById() with the ID of your spreadsheet.

## Step 5

Deploy the script as Web App:

<img src="./image/IFTTT Weather Google script code publish deploy.jpg" alt="IFTTT Weather Google script code publish deploy" width="600">

Customize the project version label:

<img src="./image/IFTTT Weather Google script code deploy.jpg" alt="IFTTT Weather Google script code deploy" width="600">

Allow the cprrect Exceution authorization to app.

Remember that "Who has access to the app" would be empty if you're access to the Google script by a ESP8266 or another micro controller without password.

## Test the Web App

Before you configure your HTTPS ESP8266 sketch to connect at the web app interface you can test the App.

Use the "Current web App URL" defined in the last image 

and add the "?readJson" parameter at the end of the URL:

https://script.google.com/macros/s/*[ID of your App]*/exec?readJson

in the browser it'll appear:

<img src="./image/IFTTT Weather Google script output json.jpg" alt="IFTTT Weather Google script output json" width="600">

If you'll want to confirm the correct json output format you'll can copy the output and paste it in the site: http://jsonformatter.org

In the right window you'll view the correct format tree of your data:

<img src="./image/IFTTT Weather Google script json parser.jpg" alt="IFTTT Weather Google script json parser" width="600">



