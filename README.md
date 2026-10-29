# ⚡ TITAN CORE - 13yo Calisthenics & Six-Pack Academy

An interactive web application built specifically for a 13-year-old teen athlete to safely build real functional strength, widen the back into a V-taper, and sculpt defined six-pack abdominals using **only a pull-up bar and bodyweight**.

---

## 🚀 How to Run the App

### Option 1: Double-Click or Open in Any Browser
Simply open [`index.html`](file:///Users/y.morsy/.gemini/antigravity/scratch/teen-core-strength-app/index.html) directly in Chrome, Safari, Edge, or Firefox on Mac, PC, iPad, or iPhone.

### Option 2: Local Python Server (Recommended)
Run the included python launcher:
```bash
python3 /Users/y.morsy/.gemini/antigravity/scratch/teen-core-strength-app/run_app.py
```
Then visit **`http://localhost:8080`** in your browser.

---

## 🎯 Key Features Built Into the App

### 1. 📅 Clear Daily Exercise Plan (Monday – Sunday Split)
- **Day 1 (Monday)**: V-Taper Pull & Six-Pack Foundation (Dead Hangs, Scapular Pulls, Negatives, Hollow Body Holds, Reverse Crunches)
- **Day 2 (Tuesday)**: Push Power & Oblique Sculpt (Push-Ups, Plank Shoulder Taps, Side Plank Pulses, Cross Mountain Climbers, Deep Squats)
- **Day 3 (Wednesday)**: Active Recovery & Spine Decompression (Spinal Waves, Cat-Cow, Relaxed Dead Hangs)
- **Day 4 (Thursday)**: Hanging Core & Arm Forge (Chin-Ups, Hanging Knee Raises, Hanging Knee Twists, Bicycle Crunches)
- **Day 5 (Friday)**: Full-Body Calisthenics & Core Armor (Pull-Ups, Push-Ups, Squats, Plank Shoulder Taps)
- **Day 6 (Saturday)**: Six-Pack Shred & Explosive Core (Hollow Body Holds, Hanging Knee Raises, Bicycle Crunches, Mountain Climbers)
- **Day 7 (Sunday)**: Rest, Nutrition & Mindset Check (Full recovery, sleep focus, weekly PR review)

### 2. 📖 Complete Exercise Breakdown (Why, How & Muscles Targeted)
Every single exercise contains:
- **Target Muscles**: Distinct primary and secondary assist tags (Upper Abs, Lower Abs, Obliques, Transverse Abdominis, Lats, Biceps, Forearms, Shoulders).
- **Why Do It**: Scientific benefits explaining how the movement creates muscle definition and functional athletic power.
- **How To Do It**: Numbered step-by-step technique instructions with breathing cues.
- **13yo Safety Cue**: Special guidance to protect developing growth plates, cervical neck, and lumbar spine.
- **Regressions & Progressions**: What to do if an exercise is too hard (e.g. negative pull-ups, chair assists) or too easy (L-sit pull-ups).

### 3. ⏱️ Interactive Guided Workout Mode (with Audio Chimes)
- Click **"Start Guided Workout"** on any day.
- A full-screen workout coach guides the user set-by-set with a circular animated timer.
- Web Audio API synthesizer produces 3-2-1 countdown beeps, start buzzers, rest chimes, and victory fanfares.
- Automatic rest intervals and form reminders.

### 4. ⏰ Habit Tracker & Customizable Reminders
- **Daily Checklist**:
  - 🏋️ Today's Workout Complete
  - 💧 Hydration (6-8 cups / 2L water)
  - 🍳 Power Fuel & Protein (Eggs, milk, chicken, lentils)
  - 🌙 8 to 9 Hours of Sleep (Human Growth Hormone release)
  - 🧍 Spine & Posture Check (Dead hang after school)
- **Notification Reminder**: Configurable daily reminder time (default 4:30 PM after school) with browser notifications and in-app sound alert.

### 5. 📊 Visual Progress Plan & Personal Records (PRs)
- **Streak Counter**: Consecutive active days with fire streak badge (`🔥`).
- **Athlete Rank System**:
  - Level 1: *Iron Recruit* (0 XP)
  - Level 2: *Core Cadet* (150 XP)
  - Level 3: *Bar Warrior* (350 XP)
  - Level 4: *Six-Pack Striker* (650 XP)
  - Level 5: *Apex Titan* (1100 XP)
- **PR Tracker**: Max pull-ups/negatives, max plank hold, and max dead hang duration with instant save and backup export.

### 6. 🧬 Interactive Anatomical Muscle Map
- Interactive SVG muscle diagram highlighting Abs (Upper & Lower), Obliques, Deep Core, Lats, Shoulders, Chest, Biceps, and Legs.
- Clicking any muscle instantly highlights it and filters the exercises that build it!

### 7. 🛡️ 13-Year-Old Safety & Nutrition Guide
- Why teens should **never** starve or do extreme cuts.
- Why pull-up bar hangs are the gold standard for posture and spine decompression.
- The step-by-step roadmap to go from 0 pull-ups to 10 strict pull-ups.

---

## 📁 File Structure
```
teen-core-strength-app/
├── index.html            # Main UI, tabs, interactive muscle map, and workout modal
├── style.css             # High-contrast athletic dark mode styling & animations
├── app.js                # Core app engine, timer logic, sound generator, and state
├── exercises-data.js     # Full database of 14 exercises, 7-day plan, and progression ranks
├── run_app.py            # Local python server runner script
└── README.md             # Documentation and usage guide
```
