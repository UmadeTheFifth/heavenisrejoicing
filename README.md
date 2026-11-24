# Heaven Is Rejoicing International Ministries

## Run the website
1. Extract the ZIP and open the folder in VS Code.
2. Use the Live Server extension to open index.html, or run `python -m http.server 8000` inside this folder and visit http://localhost:8000/ . Do not use file:// for the Firebase modules.
3. Open admin.html or select Admin portal in the footer. In demo mode you can add sermons (MP3/MP4/PDF), multiple photos, events, a YouTube link and contact details. Refresh the homepage to see changes. Demo data is stored in IndexedDB in the same browser and origin, not on a server. Demo mode is not password protected and must not be used for actual church data or sensitive messages.

## Files
- index.html: public website
- admin.html: admin portal
- css/style.css: colors, responsive layout, typography
- js/app.js: homepage carousels, media viewer, filters and contact form
- js/admin.js: admin forms
- js/store.js: local demo and placeholder content
- js/firebase-config.js and js/firebase-bridge.js: optional Firebase backend
- assets/: replace illustrations with approved church photography; update the inline hero image URLs in index.html and about image.

## Homepage background carousel
The original welcome headline, description and buttons stay fixed while three background images crossfade every 6.5 seconds. Use the existing arrows, dots or pause control. Reduced-motion preferences disable autoplay.

Only the homepage hero has been revised. Replace the `--photo` URLs on the three `.hero-slide` elements in `index.html` with local paths (for example `assets/church-worship.jpg`) to use official ministry photos. The sample stock photographs are remote, require internet access, and fall back to the original local illustrations when unavailable. They do not depict this ministry.

Starter photo sources: [Worship gathering](https://www.pexels.com/photo/worship-gathering-with-enthusiastic-crowd-34328512/), [Bible](https://www.pexels.com/photo/close-up-shot-of-a-bible-in-the-altar-5875032/), [Church service](https://www.pexels.com/photo/pastor-at-a-podium-with-her-hands-raised-8814956/).

## Activate shared cloud content before publishing
1. Create a Firebase project and register a Web app. Enable Email/Password authentication, Cloud Firestore and Cloud Storage. Cloud Storage may require a billing-enabled Blaze plan; set a budget alert. Copy your exact web app config (including storageBucket) to js/firebase-config.js and set enabled = true.
2. Publish the provided firestore.rules and storage.rules using Firebase Console. Storage may prompt for permission to access Firestore for the admin check; grant the required Firebase integration. Do not use open write rules.
3. Create the church admin user in Authentication. Copy their UID and create a Firestore document at admins/UID (for example with a field role: admin). Only Firebase project operators can assign this role. Sign into admin.html with that user's credentials.
4. Add the hosting domain to Firebase Authentication authorized domains if required. Deploy to a static HTTPS host (Netlify, Firebase Hosting or similar). Do not enable public account registration. Cloud mode starts with empty collections; local demo entries do not transfer. Add the real content using the admin portal.
5. Test from another browser that admin-only writes are blocked, that visitors can view/download published media, and that only the administrator can read prayer requests. Configure App Check, rate limiting/anti-spam for the public contact form, retention and consent/privacy notice before collecting actual messages. App Check requires additional configuration not included here.

## Content to provide
Official logo, ministry photos, pastor biography, church location, real service schedules, social links, official livestream video URL, downloadable sermons, and an approved donation/payment link. There is no fabricated church address, pastor, or service schedule. The current cross logo is temporary, as are all sample illustrations and sermon listings. The giving link is not a payment processor. Upload original files to allow downloads; YouTube links only allow embedded playback, not video downloads. Some remote media download links may open in a new tab; to save those files use the browser's save/download option. Removing an entry removes it from the public listing, not its uploaded Storage file; an administrator can delete unused files in Firebase Storage. The demo contact form stores messages locally and does not send email. Firebase mode stores messages in the private inbox, not email. The Firebase setup is supplied as starter code and has not been tested with a real project or deployed.
