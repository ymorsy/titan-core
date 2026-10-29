# ⚡ TITAN CORE - Youth Calisthenics & Six-Pack Academy

An interactive, responsive Progressive Web App (PWA) designed for **13-year-old teen athletes and multiple users** to safely build functional core strength, widen the back into a V-taper, and sculpt defined abdominals using **only a pull-up bar and bodyweight floor work**.

---

## 📱 How to Open on iPhone or iPad (Right Now on Home Wi-Fi)

1. Run the local server on your Mac:
   ```bash
   python3 /Users/y.morsy/.gemini/antigravity/scratch/teen-core-strength-app/run_app.py
   ```
2. Your terminal will display your local network address (e.g., `http://192.168.68.66:8080`).
3. **On your iPhone or iPad**:
   - Make sure your device is connected to the same Wi-Fi network.
   - Open **Safari** and go to `http://192.168.68.66:8080` (or simply click **"📲 Mobile / Publish"** on your Mac and scan the on-screen QR code with your iPhone camera!).
   - Tap Safari's **Share** button (📤) and select **"Add to Home Screen"** (➕).
   - The app installs directly onto your home screen with its own custom athletic icon, launching full-screen just like a native iOS app!

---

## 👥 Multi-User Athlete Profiles

You can now track multiple kids, siblings, or parents independently on the same device or shared family iPad:
- **Switch Athlete in 1 Tap**: Tap the athlete pill in the top header (or the "Athletes" button on the mobile bottom bar).
- **Independent Athlete Tracking**:
  - Personal Day Streak (`🔥`)
  - Workout History & Completed Days
  - Daily Habit Checklists (Water, Sleep, Fuel, Posture)
  - XP & Rank Level (Iron Recruit → Apex Titan)
  - Personal Records (PRs: Pull-Ups, Plank hold, Dead Hang)
  - Custom Workout Reminder Times
- **Add New Athletes**: Enter Name, Age, and pick from 12 fun emoji avatars (`⚡`, `🦁`, `🥊`, `🥋`, `🏆`, `🔥`, `🦅`, `🚀`, etc.).
- **Data Safety**: All profiles are saved locally in the browser with full JSON export backup.

---

## 📐 Responsive Design for All Screen Sizes

- **iPhone (All Models: SE, 11, 12, 13, 14, 15, 16 Pro Max)**:
  - **Ergonomic Bottom Navigation Bar**: Fixed at the bottom for comfortable thumb reachability (`📅 Plan`, `📊 Progress`, `✅ Habits`, `🧬 Muscles`, `👤 Athletes`).
  - **iOS Safe Area Insets**: Respects the iPhone notch, Dynamic Island, and home indicator bar.
  - **Horizontal Touch-Swipe Day Track**: Swipe through Monday–Sunday seamlessly without cluttering vertical space.
  - **Full-Screen Workout Mode**: Big circular timer, 48px+ touch buttons, and haptic-style visual and audio countdown cues.
- **iPad (Portrait & Landscape)**:
  - Takes full advantage of tablet screen width.
  - Side-by-side interactive Anatomical Body Map and exercise library so users can tap muscles and see corresponding pull-up bar exercises simultaneously.
- **Desktop & Mac**:
  - Full widescreen dashboard layout with top navigation.

---

## 🌐 How to Publish Online for Free

### Option 1: GitHub Pages (Free Forever, Custom URL)
1. Initialize a repository on GitHub (e.g. `titan-core`).
2. Run in terminal:
   ```bash
   cd /Users/y.morsy/.gemini/antigravity/scratch/teen-core-strength-app
   git remote add origin https://github.com/YOUR_USERNAME/titan-core.git
   git push -u origin main
   ```
3. In your GitHub repository: go to **Settings → Pages → Source: Deploy from a branch (main)**.
4. Your app is now live worldwide at: `https://YOUR_USERNAME.github.io/titan-core/`!

### Option 2: Netlify / Vercel (Instant Drag & Drop)
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop) or [vercel.com](https://vercel.com).
2. Drag and drop the `teen-core-strength-app` folder.
3. You will get an instant public HTTPS link with free CDN hosting.

---

## 🛠️ File Structure
```
teen-core-strength-app/
├── index.html            # Main UI, responsive tabs, SVG muscle map, and modals
├── style.css             # Responsive athletic styling (iPhone safe areas, bottom bar, iPad layout)
├── app.js                # Multi-profile engine, workout timer, sound synthesis, PWA registration
├── qr-generator.js       # Zero-dependency QR Code generator for instant iPhone/iPad camera scan
├── exercises-data.js     # Youth calisthenics database (14 exercises & 7-day plan)
├── generate_icons.py     # Pure Python PNG icon generator for PWA
├── icon-192.png          # PWA App Icon (192x192)
├── icon-512.png          # PWA App Icon (512x512)
├── apple-touch-icon.png  # iOS Home Screen App Icon
├── manifest.json         # Web App Manifest for native iOS & Android install
├── sw.js                 # Service Worker for offline performance
├── run_app.py            # Local Python server launcher with Wi-Fi IP discovery
└── README.md             # Documentation and usage guide
```
