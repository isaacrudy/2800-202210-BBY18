# 2800_2022_BBY18 - FundCart

Overview
------------
Having pulled inspiration by how joinhoney, the coupon company, uses their extension to provide the masses with coupons that are shared by the masses, we thought... huh that's a great idea if it were to be put to use through a donation system instead.

So we got to work.

Our project, FundCart, is to develop a web-app and extension(future release) to integrate online shopping with donations to provide charitable people with a convenient way to support multiple charities of their choice.

Tecnologies
------------
Currently we're utilizing:
HTML/CSS,
Node.js,
Apache with MySQL through the XAMPP Control Panel.

These above are the bare minimum to run the app effectively, locally.

File Contents
------------
```
+---public
|   |   index.html
|   |   
|   +---common
|   |   |   about_us.html
|   |   |   account_info.html
|   |   |   charities.html
|   |   |   faq.html
|   |   |   home.html
|   |   |   login.html
|   |   |   shop.html
|   |   |   signup.html
|   |   |   
|   |   +---admin_dashboard
|   |   |       admin.html
|   |   |       admin_account_update.html
|   |   |       admin_signup.html
|   |   |       
|   |   \---demo
|   |           demo_checkout.html
|   |           
|   +---css
|   |   |   buttons.css
|   |   |   custom_select.css
|   |   |   fontawesome.min.css
|   |   |   main.css
|   |   |   normalize.css
|   |   |   
|   |   +---header_footer
|   |   |       footer.css
|   |   |       header.css
|   |   |       
|   |   +---media_queries
|   |   |       about_us_media_queries.css
|   |   |       admin_media_queries.css
|   |   |       charities_queries.css
|   |   |       demo_queries.css
|   |   |       header_footer.css
|   |   |       index_queries.css
|   |   |       login_signup.css
|   |   |       shop_queries.css
|   |   |       
|   |   \---pages
|   |           about_us.css
|   |           account_info.css
|   |           admin.css
|   |           charities.css
|   |           demo_checkout.css
|   |           faq.css
|   |           home.css
|   |           landing.css
|   |           login.css
|   |           shop.css
|   |           user_timeline.css
|   |           
|   +---data
|   |       timeline-form-html.js
|   |       
|   +---img
|   |   |   favicon.ico
|   |   |   Fundcart_smaller.jpg
|   |   |   logo.png
|   |   |   
|   |   +---banners
|   |   |       bcspca.PNG
|   |   |       covenanthouse.PNG
|   |   |       nokidhungry.png
|   |   |       nokidhungry2.PNG
|   |   |       teamseas.PNG
|   |   |       teamtrees.PNG
|   |   |       
|   |   +---demo_page
|   |   |       banana.png
|   |   |       banana_small.png
|   |   |       calvin_yu.png
|   |   |       calvin_yu_small.png
|   |   |       eggs.png
|   |   |       fundmart.png
|   |   |       fundmart_full.png
|   |   |       fundmart_vertical_mobile.png
|   |   |       sinden.png
|   |   |       sinden_small.png
|   |   |       spilled_beans_small.png
|   |   |       tin_can_small.png
|   |   |       
|   |   +---developer_profile
|   |   |       Amadeus.jpg
|   |   |       bby-18.PNG
|   |   |       Calvin.jpg
|   |   |       Dennis.jpeg
|   |   |       Isaac.png
|   |   |       
|   |   +---Logos
|   |   |       cart_logo.png
|   |   |       cart_logo_vertical.png
|   |   |       cart_logo_vertical_mobile.png
|   |   |       fundcart_abbrev_text_logo.png
|   |   |       fundcart_extended_text_logo.png
|   |   |       fundcart_favicon.ico
|   |   |       fundcart_favicon.png
|   |   |       fundcart_favicon2.png
|   |   |       fundcart_full_logo.png
|   |   |       fundcart_text_logo.png
|   |   |       
|   |   \---upload
|   |           banner-2.jpg
|   |           banner.jpg
|   |           cart_logo.png
|   |           console.png
|   |           default_photo.png
|   |           download.jfif
|   |           facebook.png
|   |           favicon.ico
|   |           FFXIVMainImage.jpg
|   |           FFXIVMainImage2.jpg
|   |           FinalFantasyXIV-logos.jpeg
|   |           Fundcart_smaller.jpg
|   |           image.png
|   |           instagram.png
|   |           Logo_2.jpg
|   |           quino-al-JFeOy62yjXk-unsplash.jpg
|   |           Sleepy2.jpg
|   |           
|   +---js
|   |       account_info.js
|   |       admin_dashboard.js
|   |       admin_edit.js
|   |       admin_signup.js
|   |       demo_checkout.js
|   |       disable_scrolling.js
|   |       home.js
|   |       landing.js
|   |       loads_header_footer.js
|   |       login.js
|   |       show_shop.js
|   |       signout.js
|   |       signup.js
|   |       spilled_beans.js
```
Installation Local and modules
------------

###### Node.js and npm
We'll need npm and node.js to run this so first we'll install npm  
1. 
```
npm install -g npm
```
2. now we'll install node.js by going to:
https://nodejs.org/en/download/
and choose which installer is best suited for your machine.

Now since we have npm and node.js installed, the next few are the REQUIRED (unless labeled otherwise) packages to be installed.

###### express
```
$ npm install express
```
###### express-session
```
$ npm install express-session
```
###### express-static
```
$ npm install express-static --save
```
###### express-fileupload
```
$ npm i express-fileupload
```
###### cors
```
$ npm install cors
```
###### mysql2
```
$ npm install --save mysql2
```
###### jsdom
```
$ npm install jsdom
```
###### nodemon (optional)
```
$ npm install -g nodemon
```
###### object-assign
```
$ npm install --save object-assign
```

Hosting Service and Instructions
------------
We selected Heroku to deploy our app.

Here are minimum requirements and instructions to deploy the app using Heroku:

1. Port setting add -> process.env.PORT
let port = 8000;
app.listen(process.env.PORT || port, function () {
	console.log("Example app listening on port " + port + "!");
});

2. Must be main or master branch

3. Sets up Package.json file

"scripts": {
    "start": "nodemon app.js",
  }

4. If you have a database

add-on => cleardb
get the url from Heroku

add the connection setting to the app.js:

		const mysql = require('mysql2/promise');
		const connection = await mysql.createConnection({
			host: "us-cdbr-east-05.cleardb.net",
			user: "bbdb6cc530e412",
			password: "02465a08",
			database: "heroku_68a9797f1d076fa",
			multipleStatements: true
		});

check the connection with the database in locally first

 Deploy your app
 1. heroku git:clone -a "NameOfYourProject"
 2. git add .
 3  git commit -am "something comment"
 4. git push heroku main(master)

Using the product
------------
The app is fairly easy to use. 
Once you have it running, you just need to create an account and start shopping. There's only one "store" at the moment but it'll reflect whatever you choose to donate.

If you choose to go through the admin route, you can add/edit/delete any users that decide to create an account.
That's pretty much it, fairly simple.

Credits + References
------------
```
header.css
	Source Code
  	Title: Pure CSS Hamburger Menu & Overlay
  	Author: Brad Traversy
  	Date: April 4, 2019
  	Availability: https://codepen.io/bradtraversy/pen/vMGBjQ?editors=1100

  	Edited and adapted by Dennis Relos on May 5, 2022

client.js, app.js
	Source Code
	Title: Code Examples from COMP 1537 Web Development1
  	Author: Arron Ferguon
    Availability: BCIT Learning Hub
	
  	Edited and adapted by Amadeus Min on May 5, 2022

app.js
	Source Code
	Title: Upload and Store Images in MySQL using Node.Js, Express, Express-FileUpload & Express-Handlebars
  	Author: Raddy
    Availability: https://raddy.dev/blog/upload-and-store-images-in-mysql-using-node-js-express-express-fileupload-express-handlebars/
	
  	Edited and adapted by Amadeus Min on May 11, 2022

admin_media_queries.css, admin.css
	Source Code
	Title: Responsive Data Tables
	Author: Chris Coyier
	Availability: https://css-tricks.com/responsive-data-tables/

	Edited and adapted by Isaac Rudy on May 10th

app.js
	Source Code
	Availability: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
	Author: C.Lee
	
	Edited and adapted by Amadeus Min on May 24, 2022

home.html, home.css, admin.html, admin.css
	Source Code
	Availability: https://www.w3schools.com/howto/howto_css_modals.asp
	Author: w3schools

	Edited and adapted by Amadeus Min on May 25, 2022
```

Contact Information
------------
Amadeus Min - 
Email:  ama.m.cantabile@gmail.com ; 
Github: https://github.com/ama-cantabile

Calvin Yu - 
Email: yucalvin5@gmail.com ; 
Github: github.com/Calvinyuuu

Dennis Relos - 
Email: drelos00@gmail.com ; 
Github: github.com/drelos00

Isaac Rudy - 
Email: isaac.rudy@gmail.com ; 
Github: github.com/isaacrudy
