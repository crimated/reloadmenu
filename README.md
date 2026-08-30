# Reload Cafe Digital Menu

Build a complete mobile-first digital menu website for RELOAD CAFÉ from scratch.

I want you to build the entire project, including the frontend UI, menu system, cart, WhatsApp ordering, bilingual support, dark/light mode, About Us, location, Instagram, short opening animation, and the local file-based admin architecture described below.

Do NOT ask me to build individual parts manually. Build the complete system according to these requirements.

⸻

1. IMPORTANT — DO NOT INVENT MENU CONTENT

This is extremely important.

DO NOT create any fake products.

DO NOT generate product images.

DO NOT search for product images.

DO NOT use stock images from Unsplash, Pexels, etc.

DO NOT generate AI images of coffee, drinks, desserts, food, or any menu items.

DO NOT invent product names.

DO NOT invent prices.

DO NOT invent descriptions.

DO NOT invent menu categories.

The real menu content will be added later by me.

For now, build the complete menu UI and architecture but keep the menu empty or use a clean empty state such as:

Arabic:
“سيتم إضافة القائمة قريباً”

English:
“Menu items will be added soon”

Do NOT put fake Latte, Cappuccino, Mojito, Americano, etc. into the menu.

Do not create fake product cards.

⸻

2. BRAND

Restaurant:

RELOAD CAFÉ

Brand phrase:

RECHARGE • REFRESH • RELOAD

The design must follow the visual identity of the provided RELOAD CAFÉ logo.

The main colors should be inspired directly by the logo:

* Cream
* Beige
* Olive green
* Dark olive
* Espresso / coffee brown
* Warm neutral colors

The visual style should be:

* Premium
* Modern
* Elegant
* Minimal
* Café-inspired
* Sophisticated
* Mobile-first
* Smooth
* Fast
* Not cluttered

Do not use bright blue, neon colors, or colors that conflict with the logo.

Do not make it look like a generic AI-generated website.

⸻

3. LOGO

The RELOAD CAFÉ logo will be provided as a PNG image.

Use the actual provided PNG logo.

Do NOT recreate the logo using text or SVG.

Do NOT generate a replacement logo.

The logo should appear prominently on the landing page.

⸻

4. LANGUAGE

Primary language:

Arabic

Secondary language:

English

Arabic must be the default language.

The entire website must support both languages.

Arabic:

* RTL layout
* Arabic typography
* Arabic labels

English:

* LTR layout
* English labels

Add a language switcher:

العربية | English

The selected language should update the entire interface.

Do not mix Arabic and English randomly.

Menu products will eventually have:

* Arabic name
* English name
* Arabic description
* English description

⸻

5. DARK AND LIGHT MODE

Create both:

Light Mode

* Cream background
* Beige surfaces
* Olive primary elements
* Dark olive text
* Espresso accents

Dark Mode

* Deep espresso / dark olive background
* Cream text
* Olive buttons
* Warm beige accents

The two modes must both look intentionally designed.

Do not simply invert colors.

Add a clean theme toggle.

The theme preference can be saved locally, but DO NOT use LocalStorage for menu data or images.

⸻

6. LANDING PAGE

When the customer opens the URL, show a premium landing screen.

At the top/center:

RELOAD CAFÉ logo

Under the logo:

Reload Your Mood

Arabic:

حـَدث مزاجك

This phrase is a fixed branding phrase.

It is NOT connected to the menu database.

It must remain static.

Below it show the navigation buttons.

⸻

7. LANDING PAGE BUTTONS

Create exactly these main actions:

1 — Menu

Display:

Menu - المنيو

When clicked, open the menu.

2 — Location

Display:

موقع المحل - Location

Open this exact Google Maps URL:

https://maps.app.goo.gl/SjF4vCfhTWRfb1QBA?g_st=ic

Open it externally.

3 — About Us

Display:

نبذة عنا - About Us

Open the About Us page/section.

Use elegant icons and premium rounded buttons.

⸻

8. ABOUT US

Create a beautiful About Us page.

Display:

English headline

Where Coffee Meets Energy

Arabic description

قهوة مختصة - حلويات فاخرة - مشروبات مميزة

Location

كربلاء - مقابل مستشفى الحسيني

Phone

0771 673 5393

Working Hours

7:00 صباحاً إلى 02:00 صباحاً

Also add an Instagram button.

Display:

Instagram — @reload.caffe

When clicked, open:

https://instagram.com/reload.caffe

Use an Instagram icon.

The Instagram button should look like a real CTA button, not plain text.

⸻

9. MENU OPENING ANIMATION

When the customer clicks:

Menu - المنيو

show a very short premium animation.

The concept:

Coffee filling animation

1. Show the RELOAD CAFÉ logo.
2. Show an empty coffee cup.
3. Coffee quickly pours into the cup.
4. The coffee level rises.
5. A small amount of steam appears.
6. The cup becomes full.
7. A subtle RELOAD transition occurs.
8. Immediately reveal the menu.

The animation should communicate:

Coffee fills → Reload → Menu

VERY IMPORTANT

The animation must be extremely short.

Target:

0.8–1.5 seconds maximum.

Do NOT make it cinematic.

Do NOT make the user wait.

Do NOT create a long intro.

Do NOT add unnecessary scenes.

The menu should load in parallel while the animation is playing.

If the menu is already loaded, the transition should be almost instant.

Use lightweight CSS/SVG/HTML animation where possible.

Do not use a large video file.

⸻

10. MENU PAGE

Build a premium mobile-first menu.

The menu must support:

* Categories
* Products
* Product images
* Arabic names
* English names
* Arabic descriptions
* English descriptions
* Prices
* Availability
* Quantity
* Optional extras

However:

DO NOT ADD ANY REAL PRODUCTS NOW.

The menu must remain empty until I add the real products.

Use an elegant empty state.

The UI architecture must already be ready to dynamically display the real menu later.

⸻

11. MENU DATA ARCHITECTURE

Do NOT hardcode products inside React components.

The menu must eventually come from a file such as:

public/data/menu.json

Example structure:

{
  "categories": []
}

Do not populate it with fake products.

The frontend should read the menu dynamically from this file.

⸻

12. PRODUCT SYSTEM

Each real product will eventually support:

* ID
* Arabic name
* English name
* Arabic description
* English description
* Price
* Image
* Category
* Available / Sold Out
* Optional extras
* Sort order

Build the UI to support all of these.

Do not create sample products.

⸻

13. CART

Create a complete shopping cart system.

The customer must be able to:

* Add products
* Increase quantity
* Decrease quantity
* Remove products
* See individual prices
* See quantities
* See total price

Display currency as:

د.ع

and English:

IQD

The cart should be optimized for mobile.

Do not put fake products into the cart.

⸻

14. CUSTOMER INFORMATION

Before sending the order through WhatsApp, the customer MUST enter:

Required:

رقم الهاتف — Phone Number

العنوان — Address

Optional:

ملاحظات — Notes

Notes must clearly show as optional.

Validate the required fields before allowing the order to be sent.

Use Iraqi phone number formatting.

Allow the customer to enter a normal Iraqi mobile number such as:

0771 673 5393

⸻

15. WHATSAPP ORDERING

The restaurant WhatsApp number is:

+9647716735393

When the customer presses:

إرسال الطلب عبر واتساب

generate a WhatsApp message containing:

⸻

طلب جديد - RELOAD CAFÉ

👤 رقم الزبون:
[customer phone]

📍 العنوان:
[customer address]

🛒 الطلب:

[quantity] × [product name] — [price]

💰 الإجمالي:
[total]

📝 الملاحظات:
[notes]

⸻

The message must be generated dynamically from the customer’s actual cart.

If notes are empty, do not show an empty notes field.

Open WhatsApp with the correctly encoded message.

Do not require a WhatsApp API.

Do not require an online backend.

Use the standard WhatsApp click-to-chat approach.

⸻

16. STATIC WEBSITE

The final customer-facing website must be completely static.

The customer receives only a URL.

The public website must NOT require:

* Online database
* Authentication
* Login
* SaaS dashboard
* Online admin
* Firebase
* Supabase
* Cloudinary
* External CMS
* Online backend

The menu will ultimately be served from static files.

⸻

17. LOCAL ADMIN SYSTEM

I need a local administration tool for myself.

It must be available locally at:

http://localhost:2000/admin

This is NOT a customer-facing admin panel.

The restaurant owner will NOT access it.

Do not put an Admin button inside the public website.

Do not put Settings inside the public website.

The customer must never see the admin interface.

⸻

18. LOCAL ADMIN FEATURES

The local admin will allow me to:

Categories

* Add category
* Edit category
* Delete category
* Reorder categories

Products

* Add product
* Edit product
* Delete product
* Change price
* Change description
* Change Arabic name
* Change English name
* Upload image
* Replace image
* Delete image
* Mark available
* Mark sold out
* Reorder products

Restaurant configuration

Allow me to edit:

* Restaurant name
* Logo
* Tagline
* Colors
* WhatsApp number
* Location URL
* Instagram URL
* Address
* Working hours

These values should be stored in project files.

⸻

19. FILE-BASED STORAGE

This is extremely important.

Do NOT use LocalStorage for menu data.

Do NOT use IndexedDB.

Do NOT use an online database.

The local admin must save the data directly into project files.

Use a structure similar to:

public/
  data/
    menu.json
    config.json
  images/

When I add a product through:

localhost:2000/admin

the local backend should write the product into:

public/data/menu.json

When I upload an image, save the actual image file into:

public/images/

Then automatically update the image path in menu.json.

⸻

20. IMAGE STORAGE

Images must be real files.

Do NOT convert images to Base64.

Do NOT store images in LocalStorage.

Do NOT use Blob URLs as permanent storage.

Do NOT upload images to external services.

The local admin should allow me to select an image from my computer and save it directly into:

public/images/

Use WebP optimization where practical.

⸻

21. LOCAL BACKEND

Use a simple local backend such as Python FastAPI if appropriate.

It should only run on my computer.

For example:

localhost:2000

It should provide endpoints for:

GET /api/menu
POST /api/menu
POST /api/upload
DELETE /api/images/:filename
GET /api/config
POST /api/config

The backend’s purpose is simply to modify the local project files.

It is NOT an online backend.

⸻

22. BUILD AND DEPLOYMENT

The intended workflow is:

Local Admin
     ↓
Modify project files
     ↓
npm run build
     ↓
dist/
     ↓
Upload dist to Cloudflare Pages

Only the final static build should be deployed.

The local admin and local backend must NOT be required for the customer-facing website.

⸻

23. REUSABLE PROJECT

This project will be reused for multiple restaurants and cafés.

Therefore separate:

UI

from:

Content

from:

Images

from:

Configuration

I should be able to create another restaurant menu without rewriting the React components.

Only the data/configuration/images should change.

⸻

24. PERFORMANCE

The website must be very fast on mobile.

Use:

* Lazy loading
* Optimized images
* WebP
* Lightweight animations
* Efficient React rendering
* Minimal dependencies
* Mobile-first CSS
* Avoid unnecessary libraries

The opening animation must never significantly delay menu loading.

⸻

25. NAVIGATION

Use intuitive navigation.

The customer should always be able to return to:

* Home
* Menu
* Cart
* About

Use a clean mobile navigation system.

Do not overcrowd the screen.

⸻

26. DESIGN DETAILS

Use:

* Cream backgrounds
* Beige surfaces
* Olive buttons
* Dark olive accents
* Espresso brown
* Warm neutral shadows
* Elegant rounded corners
* Premium typography
* Subtle animations

The overall feeling should be:

Premium specialty café + modern digital experience.

Not:

Generic restaurant template.

⸻

27. IMPORTANT — NO FAKE CONTENT

Again, this is a strict requirement:

Do not create:

* Fake products
* Fake menu categories
* Fake prices
* Fake product descriptions
* Fake product photos
* AI-generated product photos
* Stock product photos
* Placeholder food photos

Only create the UI and empty menu architecture.

I will add the actual menu content later.

⸻

28. FINAL RESULT

The final experience should be:

Customer opens URL

↓

RELOAD CAFÉ logo

↓

“Reload Your Mood / حـَدث مزاجك”

↓

Buttons:

Menu - المنيو

موقع المحل - Location

نبذة عنا - About Us

↓

If Menu is selected:

Very short coffee filling animation

↓

Menu

↓

Customer selects real products

↓

Cart

↓

Total price

↓

Phone + Address + Optional Notes

↓

إرسال الطلب عبر واتساب

↓

Order opens in WhatsApp to:

+9647716735393

⸻

Build the project from scratch following ALL requirements above.

Prioritize a polished mobile UI, strong RELOAD CAFÉ branding, clean architecture, Arabic RTL support, and performance.

Most importantly:

DO NOT INVENT ANY MENU PRODUCTS OR PRODUCT IMAGES.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b245fd3-d394-4162-ac07-b6af2e7ad3a0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
