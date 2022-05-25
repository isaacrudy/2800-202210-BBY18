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
Installation
------------
express
express-session
jsdom
express-fileupload
mysql2
fs
cors