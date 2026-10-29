// Exercise database & Workout plans designed specifically for youth / 13-year-old calisthenics
// Equipment available: Pull-up bar & bodyweight
// Focus: Safe form, spinal protection, functional core strength, V-taper back, visible abs

const EXERCISES_DATABASE = {
  // PULL-UP BAR EXERCISES
  "dead_hang": {
    id: "dead_hang",
    name: "Active Dead Hang",
    category: "Pull-up Bar",
    difficulty: "Beginner",
    equipment: "Pull-up Bar",
    defaultReps: "3 sets x 20-40 seconds",
    isTimed: true,
    defaultSeconds: 30,
    targetMuscles: {
      primary: ["Forearms & Grip", "Latissimus Dorsi (Lats)", "Spinal Decompressors"],
      secondary: ["Shoulders", "Core / Transverse Abdominis"],
      highlight: ["forearms", "lats", "core"]
    },
    why: "Decompresses the spine after sitting all day at school, builds insane grip strength, and primes your shoulders and lats for strong pull-ups without risking joint injury.",
    how: [
      "Grip the bar slightly wider than shoulder-width with palms facing away from you (overhand grip).",
      "Hang completely free with feet off the floor. Keep your arms straight.",
      "Engage your shoulders slightly by pulling them away from your ears (don't let your neck disappear).",
      "Squeeze your abs and glutes so your body doesn't swing like a pendulum.",
      "Breathe smoothly through your nose. Hold for the target time."
    ],
    teenTips: "If your hands feel slippery, wipe them with a towel. Don't jump down hard onto cold floors; step down gently so your knees and ankles stay safe.",
    regression: "Toe-supported hang (keep toes lightly touching a stool to reduce bodyweight load).",
    progression: "One-arm assisted hang or Single-hand alternating touches."
  },

  "scapular_pulls": {
    id: "scapular_pulls",
    name: "Scapular Pull-Ups (Shoulder Shrugs)",
    category: "Pull-up Bar",
    difficulty: "Beginner",
    equipment: "Pull-up Bar",
    defaultReps: "3 sets x 8-10 reps",
    isTimed: false,
    defaultSeconds: 45,
    targetMuscles: {
      primary: ["Lower Trapezius", "Rhomboids", "Lats"],
      secondary: ["Rotator Cuff", "Grip Strength"],
      highlight: ["upper_back", "lats"]
    },
    why: "This is the 'secret weapon' exercise. It teaches your back muscles to initiate the pull before your arms kick in. It prevents shoulder pain and guarantees you learn strict, powerful pull-ups.",
    how: [
      "Hang from the pull-up bar with straight arms in an active dead hang position.",
      "WITHOUT bending your elbows, pull your shoulder blades down and together toward your back pockets.",
      "Your head and chest will rise up 2-4 inches smoothly.",
      "Hold at the top for 1 full second, feeling your upper back tighten.",
      "Slowly lower back to straight arms with full control. Repeat for reps."
    ],
    teenTips: "Resist the urge to bend your elbows! Keep your arms completely locked straight—the only movement comes from your shoulder blades.",
    regression: "Scapular pulls with feet resting lightly on a box or chair.",
    progression: "Pause for 3 full seconds at the contracted peak."
  },

  "negative_pullups": {
    id: "negative_pullups",
    name: "Eccentric (Negative) Pull-Ups",
    category: "Pull-up Bar",
    difficulty: "Beginner to Intermediate",
    equipment: "Pull-up Bar",
    defaultReps: "3 sets x 4-6 controlled negatives",
    isTimed: false,
    defaultSeconds: 40,
    targetMuscles: {
      primary: ["Latissimus Dorsi", "Biceps", "Upper Back"],
      secondary: ["Abs (Anti-extension)", "Forearms"],
      highlight: ["lats", "biceps", "abs", "upper_back"]
    },
    why: "Muscles are up to 40% stronger on the lowering (eccentric) phase. This builds real upper-body pulling strength faster than anything else, allowing any teen to master their first strict pull-up.",
    how: [
      "Place a chair or step under the bar so you can safely reach the top.",
      "Jump or step up until your chin is cleanly over the pull-up bar, chest close to the bar.",
      "Lock your core tight (hollow body posture, ribs down).",
      "Slowly lower yourself down over 4 to 5 full seconds. Count '1-Mississippi, 2-Mississippi...'",
      "Reach full straight arms at the bottom, step back onto the chair, and repeat."
    ],
    teenTips: "Do not rush the drop! The slower you fight gravity, the more muscle fibers you activate in your back and biceps.",
    regression: "Band-assisted or foot-assisted lowering.",
    progression: "Slow down the descent to 6-8 seconds."
  },

  "chin_ups": {
    id: "chin_ups",
    name: "Underhand Chin-Ups",
    category: "Pull-up Bar",
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    defaultReps: "3 sets x 4-8 reps (or max clean reps)",
    isTimed: false,
    defaultSeconds: 45,
    targetMuscles: {
      primary: ["Biceps Brachii", "Lats (Outer wings)", "Upper Core"],
      secondary: ["Chest (Pectorals)", "Forearms"],
      highlight: ["biceps", "lats", "abs"]
    },
    why: "Chin-ups use an underhand grip, putting your biceps in their strongest mechanical position. They build thick arms, a wide back, and trigger hard abdominal contraction to stabilize your torso.",
    how: [
      "Grip the bar with palms facing you (supinated), shoulder-width apart.",
      "Start from a dead hang with arms straight, chest proud.",
      "Drive your elbows down into your ribs as you pull your chin smoothly over the bar.",
      "Do NOT kick your legs or swing your knees.",
      "Lower down under control until your arms are straight before starting the next rep."
    ],
    teenTips: "Keep your legs glued together and slightly in front of you. This automatically braces your six-pack muscles and prevents swinging.",
    regression: "Negative chin-ups or chair-assisted chin-ups.",
    progression: "Add a 2-second hold at the top with chin over bar."
  },

  "strict_pullups": {
    id: "strict_pullups",
    name: "Classic Overhand Pull-Ups",
    category: "Pull-up Bar",
    difficulty: "Intermediate / Advanced",
    equipment: "Pull-up Bar",
    defaultReps: "3-4 sets x 3-8 reps",
    isTimed: false,
    defaultSeconds: 50,
    targetMuscles: {
      primary: ["Latissimus Dorsi", "Rear Deltoids", "Brachialis"],
      secondary: ["Upper Abs", "Rhomboids", "Core"],
      highlight: ["lats", "upper_back", "abs", "arms"]
    },
    why: "The king of upper body calisthenics. It builds the classic 'V-taper' physique that makes the waist look tighter and accentuates your six-pack abdomen.",
    how: [
      "Overhand grip (palms facing away), hands just outside shoulder-width.",
      "Engage your lats by pulling shoulder blades down (scapular pull).",
      "Pull up until your upper chest touches or chin clears the bar cleanly.",
      "Pause for half a second at the peak.",
      "Lower yourself smoothly back to a full dead hang. No half-reps!"
    ],
    teenTips: "Strict form > ego! 3 perfect pull-ups with zero swinging will build 10x more muscle than 10 kipping/jerking reps, and it protects your growing shoulder joints.",
    regression: "Negative pull-ups or Chin-ups.",
    progression: "Pull-up to L-sit or chest-to-bar pull-ups."
  },

  "hanging_knee_raises": {
    id: "hanging_knee_raises",
    name: "Hanging Knee Raises",
    category: "Pull-up Bar Core",
    difficulty: "Beginner to Intermediate",
    equipment: "Pull-up Bar",
    defaultReps: "3 sets x 10-15 reps",
    isTimed: false,
    defaultSeconds: 40,
    targetMuscles: {
      primary: ["Rectus Abdominis (Lower 6-pack)", "Transverse Abdominis"],
      secondary: ["Hip Flexors", "Forearms / Grip", "Lats"],
      highlight: ["lower_abs", "abs", "forearms"]
    },
    why: "Directly fires the hard-to-reach lower abdominal wall. Lifting the pelvis upward flexes the lumbar spine safely, etching deep lines into your lower six-pack.",
    how: [
      "Hang from the bar with an overhand grip, shoulders engaged.",
      "Take a breath, brace your core, and tilt your pelvis backward.",
      "Bring both knees up toward your chest as high as possible (past 90 degrees).",
      "Imagine trying to roll your tailbone toward your chin at the very top.",
      "Lower your legs down SLOWLY so you don't swing into momentum."
    ],
    teenTips: "If you start swinging like a bell, pause between each rep and let your heels tap the floor lightly to reset before raising again.",
    regression: "Lying reverse crunches on floor.",
    progression: "Straight hanging leg raises (toes to bar or toes to hip level)."
  },

  "hanging_knee_twists": {
    id: "hanging_knee_twists",
    name: "Hanging Oblique Knee Twists",
    category: "Pull-up Bar Core",
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    defaultReps: "3 sets x 12-16 alternating reps (6-8 per side)",
    isTimed: false,
    defaultSeconds: 45,
    targetMuscles: {
      primary: ["Internal & External Obliques", "Rectus Abdominis"],
      secondary: ["Serratus Anterior", "Grip Strength"],
      highlight: ["obliques", "lower_abs"]
    },
    why: "Builds the 'Apollo's belt' / V-cut lines along the sides of the hips and carves out the serratus muscles (ribcage fingers), framing your six-pack.",
    how: [
      "Hang from the pull-up bar with arms straight.",
      "Lift your knees upward while twisting your hips toward your right armpit.",
      "Squeeze your right oblique tight at the top for a quick count.",
      "Lower back to center under control.",
      "Raise and twist toward your left armpit on the next rep."
    ],
    teenTips: "Focus on bringing your hip toward your ribs, not just throwing your knees around.",
    regression: "Floor bicycle crunches or lying side knee tucks.",
    progression: "Hanging windshield wipers with knees bent or straight legs."
  },

  // FLOOR & CORE EXERCISES (BODYWEIGHT)
  "hollow_body_hold": {
    id: "hollow_body_hold",
    name: "Gymnastic Hollow Body Hold",
    category: "Floor Core",
    difficulty: "Beginner to Intermediate",
    equipment: "Floor / Mat",
    defaultReps: "3-4 sets x 20-30 seconds",
    isTimed: true,
    defaultSeconds: 25,
    targetMuscles: {
      primary: ["Rectus Abdominis (All 6 blocks)", "Transverse Abdominis"],
      secondary: ["Hip Flexors", "Quads"],
      highlight: ["abs", "lower_abs", "core"]
    },
    why: "The foundation of all gymnastics and calisthenics. It glues your lower back to the ground, teaches total core compression, and flattens your belly for sharp abdominal definition.",
    how: [
      "Lie flat on your back on the floor.",
      "Press your lower back hard into the floor—there should be ZERO gap between your spine and the ground.",
      "Lift your shoulder blades 2 inches off the ground, arms reaching forward or overhead.",
      "Lift your straight legs 3-6 inches off the ground, toes pointed.",
      "Form a shallow banana shape. Breathe shallowly while maintaining rock-solid tension."
    ],
    teenTips: "Test yourself: Slide your hand under your lower back. If your hand can slide under, your back is arching! Tuck your knees closer to your chest until your lower back is firmly sealed against the floor.",
    regression: "Tuck hollow hold (knees bent at 90 degrees, hands reaching toward ankles).",
    progression: "Hollow body rock (gently rocking forward and back without breaking the rigid curved shape)."
  },

  "plank_shoulder_taps": {
    id: "plank_shoulder_taps",
    name: "Anti-Rotation Plank Shoulder Taps",
    category: "Floor Core",
    difficulty: "Beginner",
    equipment: "Floor / Mat",
    defaultReps: "3 sets x 20 taps total (10 each side)",
    isTimed: false,
    defaultSeconds: 40,
    targetMuscles: {
      primary: ["Transverse Abdominis", "Internal & External Obliques"],
      secondary: ["Deltoids (Shoulders)", "Serratus Anterior"],
      highlight: ["core", "obliques", "shoulders"]
    },
    why: "Trains your core in 'anti-rotation'—stopping your body from twisting when one hand leaves the floor. This deep core armor protects your lower back during sports like soccer, basketball, or martial arts.",
    how: [
      "Get into a high push-up plank position with hands under shoulders.",
      "Widen your feet slightly wider than hip-width for balance.",
      "Brace your abs like you're about to take a punch in the stomach.",
      "Slowly lift your right hand and tap your left shoulder without letting your hips tilt or sway.",
      "Place right hand down and repeat with your left hand tapping your right shoulder."
    ],
    teenTips: "Imagine balancing a bowl of hot soup on your lower back. Don't spill a single drop! Keep your hips as still as stone.",
    regression: "Kneeling plank shoulder taps.",
    progression: "Narrow foot stance or hold the shoulder tap for 2 seconds before lowering."
  },

  "side_plank_pulse": {
    id: "side_plank_pulse",
    name: "Side Plank & Hip Dip Pulse",
    category: "Floor Core",
    difficulty: "Beginner to Intermediate",
    equipment: "Floor / Mat",
    defaultReps: "3 sets x 10-12 pulses per side (or 25s hold)",
    isTimed: false,
    defaultSeconds: 35,
    targetMuscles: {
      primary: ["Obliques (Sides of the waist)", "Quadratus Lumborum"],
      secondary: ["Gluteus Medius", "Shoulder Stabilizers"],
      highlight: ["obliques", "core"]
    },
    why: "Toughens the lateral core wall, stabilizes your spine, and tightens your waist so your front six-pack stands out with high contrast.",
    how: [
      "Lie on your right side with forearm flat on the ground directly below your shoulder.",
      "Stack your feet on top of each other (or place top foot just in front for balance).",
      "Lift your hips until your body forms a straight diagonal line from head to ankles.",
      "Lower your bottom hip 2-3 inches toward the floor, then squeeze your obliques to drive it back high.",
      "Complete reps, then switch to your left side."
    ],
    teenTips: "Keep your neck relaxed in line with your spine. Don't let your top shoulder roll forward—keep your chest open.",
    regression: "Bent-knee side plank (bottom knee rests on the floor).",
    progression: "Elevate your top leg into a side plank star hold."
  },

  "cross_mountain_climbers": {
    id: "cross_mountain_climbers",
    name: "Cross-Body Mountain Climbers",
    category: "Dynamic Core",
    difficulty: "Beginner",
    equipment: "Floor / Mat",
    defaultReps: "3 sets x 30-40 seconds",
    isTimed: true,
    defaultSeconds: 30,
    targetMuscles: {
      primary: ["Obliques", "Rectus Abdominis"],
      secondary: ["Hip Flexors", "Shoulders", "Cardiovascular Endurance"],
      highlight: ["obliques", "abs", "shoulders"]
    },
    why: "Combines dynamic rotational core training with calorie burn. Doing these burns off the superficial belly layer so your six-pack muscles become visible.",
    how: [
      "Set up in a solid push-up plank position with wrists directly beneath shoulders.",
      "Drive your right knee across under your body toward your LEFT elbow.",
      "Squeeze your abs for a split second, then return to starting plank.",
      "Immediately drive your left knee across toward your RIGHT elbow.",
      "Keep a smooth, rhythmic pace without bouncing your hips up into the air."
    ],
    teenTips: "Keep your butt down! Your body should remain in a plank line, not a mountain tent peak.",
    regression: "Slow step-by-step cross knee drives (no running speed).",
    progression: "Speed tempo cross climbers with 1-second pause on each crossover."
  },

  "bicycle_crunches": {
    id: "bicycle_crunches",
    name: "Precision Bicycle Crunches",
    category: "Floor Core",
    difficulty: "Beginner to Intermediate",
    equipment: "Floor / Mat",
    defaultReps: "3 sets x 16-20 total reps (8-10 per side)",
    isTimed: false,
    defaultSeconds: 35,
    targetMuscles: {
      primary: ["Rectus Abdominis (Upper & Lower)", "External Obliques"],
      secondary: ["Hip Flexors"],
      highlight: ["abs", "obliques"]
    },
    why: "Scientific EMG studies by San Diego State University rated the bicycle crunch as the #1 most effective bodyweight exercise for total abdominal muscle activation.",
    how: [
      "Lie on your back, hands lightly touching the sides of your head (do NOT pull on your neck!).",
      "Lift your shoulder blades off the floor and bring both knees to 90 degrees.",
      "Extend your right leg straight out while rotating your right shoulder toward your bent left knee.",
      "Pause for 1 second at the peak twist.",
      "Smoothly reverse: extend left leg and rotate left shoulder toward right knee."
    ],
    teenTips: "Never yank your head forward with your hands! Your hands are only there as gentle rests. Rotate with your ribcage, not your elbows.",
    regression: "Feet touch floor between each rep.",
    progression: "3-second pause at each rotational crossover."
  },

  "reverse_crunches": {
    id: "reverse_crunches",
    name: "Controlled Reverse Crunches",
    category: "Floor Core",
    difficulty: "Beginner",
    equipment: "Floor / Mat",
    defaultReps: "3 sets x 12-15 reps",
    isTimed: false,
    defaultSeconds: 40,
    targetMuscles: {
      primary: ["Lower Rectus Abdominis"],
      secondary: ["Transverse Abdominis"],
      highlight: ["lower_abs", "abs"]
    },
    why: "Unlike normal crunches that can stress a growing teenager's cervical spine/neck, reverse crunches keep the head safely grounded while targeting the lower abdomen with high precision.",
    how: [
      "Lie flat on your back with arms extended down along your sides, palms pressed into the floor.",
      "Bend your knees to 90 degrees and lift your feet off the floor.",
      "Using ONLY your lower abs, curl your hips and tailbone off the floor toward your ribcage.",
      "Hold the contraction at the top for 1 count.",
      "Slowly lower your hips back down without letting your lower back arch off the floor."
    ],
    teenTips: "Do not throw your legs back or use swinging momentum. The movement is small (hips lift just 3-4 inches), but when done slowly, your lower abs will burn!",
    regression: "Smaller range of motion, focusing purely on pelvic tuck.",
    progression: "Straight leg reverse crunch with vertical hip thrust."
  },

  "classic_pushups": {
    id: "classic_pushups",
    name: "Strict Form Push-Ups",
    category: "Push Strength",
    difficulty: "Beginner to Intermediate",
    equipment: "Floor",
    defaultReps: "3 sets x 8-15 clean reps",
    isTimed: false,
    defaultSeconds: 45,
    targetMuscles: {
      primary: ["Chest (Pectorals)", "Triceps", "Front Shoulders"],
      secondary: ["Core (Anti-extension)", "Serratus Anterior"],
      highlight: ["chest", "triceps", "shoulders", "core"]
    },
    why: "Push-ups balance out your pulling work from the pull-up bar. They build a broad chest, strong shoulders, and act as a dynamic moving plank that tightens your whole midsection.",
    how: [
      "Hands placed flat on the floor, slightly wider than shoulder-width.",
      "Screw your hands into the floor (fingers pointing forward, thumbs inward).",
      "Lock your glutes, legs, and abs so your body is a solid plank.",
      "Lower your chest down until it hovers 1 inch above the floor (elbows tucked at 45 degrees, not flared like chicken wings).",
      "Push forcefully through your palms back to full lockout."
    ],
    teenTips: "Don't let your hips sag down—that pinches your lower back. If you can't keep a straight line, elevate your hands on a bed, bench, or desk (incline pushup).",
    regression: "Incline push-ups (hands on a sturdy table or chair).",
    progression: "Diamond push-ups or 3-second descent push-ups."
  },

  "bodyweight_squats": {
    id: "bodyweight_squats",
    name: "Deep Calisthenic Squats",
    category: "Lower Body",
    difficulty: "Beginner",
    equipment: "Floor",
    defaultReps: "3 sets x 15-20 reps",
    isTimed: false,
    defaultSeconds: 45,
    targetMuscles: {
      primary: ["Quadriceps", "Glutes", "Hamstrings"],
      secondary: ["Core / Spinal Erectors", "Calves"],
      highlight: ["legs", "core"]
    },
    why: "Training legs stimulates full-body growth hormone release naturally. Strong legs and glutes also fix pelvic posture, eliminating 'belly pooch' caused by anterior pelvic tilt.",
    how: [
      "Stand with feet shoulder-width apart, toes turned slightly out (15-30 degrees).",
      "Keep your chest upright and reach your arms straight forward for balance.",
      "Push your hips back and down like sitting into a chair.",
      "Descend until your hip crease drops just below your knee caps (parallel or below).",
      "Drive through your entire foot (especially heels) to stand tall. Squeeze your glutes at the top."
    ],
    teenTips: "Keep your knees tracking directly over your middle toes—don't let your knees collapse inward.",
    regression: "Box squat (squatting down to tap a chair, then standing up).",
    progression: "Jump squats or pause squats (3-second hold at the bottom)."
  },

  "cat_cow_and_cobra": {
    id: "cat_cow_and_cobra",
    name: "Spinal Wave & Cobra Mobility",
    category: "Mobility & Recovery",
    difficulty: "All Levels",
    equipment: "Floor / Mat",
    defaultReps: "2 sets x 8-10 slow cycles",
    isTimed: true,
    defaultSeconds: 45,
    targetMuscles: {
      primary: ["Spinal Erector Muscles", "Abdominal Wall Stretch"],
      secondary: ["Shoulders", "Chest"],
      highlight: ["core", "upper_back"]
    },
    why: "Restores spinal flexibility, prevents stiffness from school desks, and elongates the abdominal muscles so they heal and grow without tightness.",
    how: [
      "Start on all fours with hands under shoulders, knees under hips.",
      "Inhale, arch your back gently, let belly dip down, and look upward toward the ceiling (Cow).",
      "Exhale, round your spine toward the ceiling, tucking your chin and tailbone (Cat).",
      "Flow smoothly between these for 6 cycles, then gently lower hips to the floor and press chest up into a light Cobra stretch."
    ],
    teenTips: "Never force a painful stretch. Move smoothly with your breath like a wave.",
    regression: "Gentle child's pose rest.",
    progression: "Add thoracic spine rotation reaching one arm to the ceiling."
  }
};

// 7-DAY WEEKLY MASTER PLAN FOR 13-YEAR-OLD CORE & STRENGTH
const WEEKLY_WORKOUT_PLAN = [
  {
    dayNumber: 1,
    dayName: "Monday",
    title: "V-Taper Pull & Six-Pack Foundation",
    focus: "Pull-up bar back strength + Upper abs & hollow core compression",
    intensity: "High",
    estimatedMinutes: 25,
    warmup: [
      { name: "Arm Circles & Shoulder Dislocates", duration: "60s", note: "Prep shoulder joints for hanging" },
      { name: "Spinal Wave & Cat-Cow", duration: "60s", note: "Wake up the spine" }
    ],
    exercises: [
      { id: "dead_hang", sets: 3, target: "25-35s hold", rest: "45s" },
      { id: "scapular_pulls", sets: 3, target: "8-10 reps", rest: "45s" },
      { id: "negative_pullups", sets: 3, target: "4-6 slow negatives (or 3-6 pullups)", rest: "60s" },
      { id: "hollow_body_hold", sets: 3, target: "20-30s hold", rest: "45s" },
      { id: "reverse_crunches", sets: 3, target: "12-15 reps", rest: "45s" }
    ],
    cooldown: "Active dead hang decompresion (20s) + Deep belly breathing.",
    teenAdvice: "Pull-ups build the back wings (lats). The wider your back gets, the smaller and tighter your waist looks!"
  },
  {
    dayNumber: 2,
    dayName: "Tuesday",
    title: "Push Power & Oblique Sculpt",
    focus: "Upper body pushing (chest/shoulders) + Side core & waist taper",
    intensity: "Medium-High",
    estimatedMinutes: 25,
    warmup: [
      { name: "Jumping Jacks", duration: "60s", note: "Elevate heart rate" },
      { name: "Wrist Rolls & Torso Twists", duration: "60s", note: "Prep wrists for pushups" }
    ],
    exercises: [
      { id: "classic_pushups", sets: 3, target: "8-15 clean reps", rest: "60s" },
      { id: "plank_shoulder_taps", sets: 3, target: "20 taps total", rest: "45s" },
      { id: "side_plank_pulse", sets: 3, target: "10-12 pulses / side", rest: "45s" },
      { id: "cross_mountain_climbers", sets: 3, target: "30s rapid drive", rest: "45s" },
      { id: "bodyweight_squats", sets: 3, target: "15 reps", rest: "45s" }
    ],
    cooldown: "Cobra stretch for abs (30s) + Child's pose (45s).",
    teenAdvice: "Cross climbers and side planks carve out the side 'cut' lines that frame your six-pack abdomen."
  },
  {
    dayNumber: 3,
    dayName: "Wednesday",
    title: "Active Recovery, Spine Decompress & Mobility",
    focus: "Growth plate protection, joint recovery, posture alignment",
    intensity: "Light / Restorative",
    estimatedMinutes: 15,
    warmup: [
      { name: "Neck & Shoulder Rolls", duration: "60s", note: "Release computer/phone desk tension" }
    ],
    exercises: [
      { id: "dead_hang", sets: 3, target: "20-30s relaxed hang", rest: "45s" },
      { id: "cat_cow_and_cobra", sets: 3, target: "8-10 cycles", rest: "30s" },
      { id: "hollow_body_hold", sets: 2, target: "20s gentle form practice", rest: "45s" }
    ],
    cooldown: "Full body floor stretch & 5 minutes of relaxed diaphragmatic breathing.",
    teenAdvice: "Muscles actually GROW when you rest and sleep! A light recovery day ensures your joints stay healthy and ready to hit PRs tomorrow."
  },
  {
    dayNumber: 4,
    dayName: "Thursday",
    title: "Hanging Core & Arm Forge",
    focus: "Hanging knee raises on pull-up bar + Underhand bicep chin-ups",
    intensity: "High",
    estimatedMinutes: 25,
    warmup: [
      { name: "Grip Clenches & High Knees", duration: "60s", note: "Warm up grip and hip flexors" },
      { name: "Shoulder Circles", duration: "60s", note: "Prep rotator cuffs" }
    ],
    exercises: [
      { id: "chin_ups", sets: 3, target: "4-8 reps (or 4 negatives)", rest: "60s" },
      { id: "hanging_knee_raises", sets: 3, target: "10-15 controlled reps", rest: "45s" },
      { id: "hanging_knee_twists", sets: 3, target: "12-14 alternating reps", rest: "45s" },
      { id: "bicycle_crunches", sets: 3, target: "16-20 total reps", rest: "45s" },
      { id: "dead_hang", sets: 2, target: "Max comfortable hold", rest: "60s" }
    ],
    cooldown: "Biceps and chest doorway stretch (30s each side).",
    teenAdvice: "Hanging knee raises roll your pelvis toward your chest—this is the exact biomechanical motion that turns lower belly into six-pack tiles."
  },
  {
    dayNumber: 5,
    dayName: "Friday",
    title: "Full Body Calisthenics & Deep Core Armor",
    focus: "Athletic calisthenic compound circuit + Anti-extension core",
    intensity: "Medium-High",
    estimatedMinutes: 25,
    warmup: [
      { name: "Shadow Boxing / Jumping Jacks", duration: "60s", note: "Get energized" },
      { name: "Leg Swings Forward & Back", duration: "60s", note: "Open hips for squats" }
    ],
    exercises: [
      { id: "strict_pullups", sets: 3, target: "3-8 reps (or negative pullups)", rest: "60s" },
      { id: "classic_pushups", sets: 3, target: "10-15 clean reps", rest: "60s" },
      { id: "bodyweight_squats", sets: 3, target: "15-20 deep squats", rest: "45s" },
      { id: "plank_shoulder_taps", sets: 3, target: "20 taps total", rest: "45s" },
      { id: "reverse_crunches", sets: 3, target: "12-15 reps", rest: "45s" }
    ],
    cooldown: "Quad stretch + Deep forward fold breathing.",
    teenAdvice: "Compound full-body workouts boost your athletic power and burn energy all day long."
  },
  {
    dayNumber: 6,
    dayName: "Saturday",
    title: "Six-Pack Shred & Explosive Core",
    focus: "Maximum abdominal burn + Endurance stamina test",
    intensity: "High",
    estimatedMinutes: 20,
    warmup: [
      { name: "Bear Crawl Hold", duration: "45s", note: "Fire up deep core" },
      { name: "Torso Rotations", duration: "45s", note: "Prep obliques" }
    ],
    exercises: [
      { id: "hollow_body_hold", sets: 3, target: "25-35s hold", rest: "45s" },
      { id: "hanging_knee_raises", sets: 3, target: "10-14 reps", rest: "45s" },
      { id: "bicycle_crunches", sets: 3, target: "20 slow reps", rest: "45s" },
      { id: "cross_mountain_climbers", sets: 3, target: "35s burn", rest: "45s" },
      { id: "side_plank_pulse", sets: 2, target: "10 pulses / side", rest: "30s" }
    ],
    cooldown: "Lying quad/hip flexor stretch + Relaxed dead hang (25s).",
    teenAdvice: "Feel the burn in your abs, breathe steady through your nose, and keep strict form on every rep!"
  },
  {
    dayNumber: 7,
    dayName: "Sunday",
    title: "Complete Rest, Nutrition & Growth Mindset",
    focus: "Total physical recovery, hydration check, posture reset, weekly reflection",
    intensity: "Rest",
    estimatedMinutes: 10,
    warmup: [],
    exercises: [
      { id: "cat_cow_and_cobra", sets: 2, target: "10 gentle waves", rest: "30s" },
      { id: "dead_hang", sets: 1, target: "30s spinal release", rest: "0s" }
    ],
    cooldown: "Sunday review: log your stats, celebrate this week's streak, and get 9 hours of sleep!",
    teenAdvice: "True athletes know that champion physiques are built on rest days. Eat healthy protein (eggs, milk, chicken, lentils), drink water, and sleep like a bear!"
  }
];

// DAILY HABITS TO TRACK FOR A 13-YEAR-OLD ATHLETE
const DAILY_HABIT_TEMPLATES = [
  {
    id: "habit_workout",
    title: "Complete Daily Workout",
    desc: "Follow today's scheduled pull-up bar & core routine",
    icon: "🏋️",
    badge: "Strength"
  },
  {
    id: "habit_water",
    title: "Hydration Goal (6-8 Cups / 2L)",
    desc: "Water keeps muscles full, energizes workouts & speeds recovery",
    icon: "💧",
    badge: "Fuel"
  },
  {
    id: "habit_protein",
    title: "Power Fuel (Protein & Real Food)",
    desc: "Eggs, milk, chicken, fish, beans or nuts to build muscle fibers",
    icon: "🍳",
    badge: "Nutrition"
  },
  {
    id: "habit_sleep",
    title: "8 to 9 Hours of Sleep",
    desc: "Human Growth Hormone (HGH) peaks during deep teenage sleep",
    icon: "🌙",
    badge: "Growth"
  },
  {
    id: "habit_posture",
    title: "Spine & Posture Check",
    desc: "Shoulders back, chest tall, 1 dead hang or stretch after school",
    icon: "🧍",
    badge: "Posture"
  }
];

// TEEN ATHLETE RANK PROGRESSION (XP & BADGES)
const PROGRESSION_RANKS = [
  { level: 1, title: "Iron Recruit", minXp: 0, badge: "🌱", desc: "Starting the journey to unbreakable discipline" },
  { level: 2, title: "Core Cadet", minXp: 150, badge: "🛡️", desc: "First week completed! Grip & abs are hardening" },
  { level: 3, title: "Bar Warrior", minXp: 350, badge: "⚔️", desc: "Pull-up numbers rising, core compression mastered" },
  { level: 4, title: "Six-Pack Striker", minXp: 650, badge: "⚡", desc: "Abdominal definition showing, high athletic endurance" },
  { level: 5, title: "Apex Titan", minXp: 1100, badge: "👑", desc: "Unstoppable calisthenics master with rock-solid six pack" }
];
