# Sound Implementation Guide

## ✅ What's Been Implemented

### 1. **Sound System Architecture**
- ✅ Production-ready `useSound` hook (`src/hooks/useSound.ts`)
- ✅ Sound path mapper utility (`src/utils/soundMapper.ts`)
- ✅ Directory structure created (`public/sounds/alarms/`, `public/sounds/ambient/`)
- ✅ Integration with `TimerDisplay` component
- ✅ Volume control from user settings
- ✅ Graceful error handling for missing files

### 2. **Features**
- ✅ **Alarm Sounds**: Play when Pomodoro/Break sessions complete
- ✅ **Ticking Sounds**: Loop during active FOCUS sessions only
- ✅ **Volume Control**: Respects user's volume setting (0-100%)
- ✅ **Preloading**: Sounds preload for instant playback
- ✅ **Browser Compatibility**: Handles autoplay policies gracefully
- ✅ **Memory Management**: Properly cleans up audio elements

---

## 📁 Required Sound Files

You need to add **6 sound files** to complete the implementation:

### **Alarms** (Short sounds, 1-3 seconds)
Place in: `public/sounds/alarms/`

1. **bell.mp3** - Pleasant bell chime
2. **digital.mp3** - Digital beep/alert
3. **bird.mp3** - Bird chirp or nature sound

### **Ambient** (Looping sounds)
Place in: `public/sounds/ambient/`

4. **ticking-fast.mp3** - Clock ticking (1 tick/second)
5. **ticking-slow.mp3** - Clock ticking (1 tick/2 seconds)
6. **white-noise.mp3** - Soft white noise

---

## 🎵 Where to Get Free Sounds

### Recommended Sources:

1. **[Freesound.org](https://freesound.org/)** (Requires attribution)
   - Search: "bell chime", "clock tick", "white noise"
   - License: Creative Commons

2. **[Zapsplat.com](https://www.zapsplat.com/)** (Free for personal/commercial)
   - High-quality sound effects
   - No attribution required

3. **[Mixkit.co](https://mixkit.co/free-sound-effects/)** (Free license)
   - Modern, clean sounds
   - No attribution required

4. **[Pixabay Audio](https://pixabay.com/sound-effects/)** (Free license)
   - Wide variety
   - No attribution required

### Search Terms:
- Bell: "notification bell", "chime", "ding"
- Digital: "beep", "alert", "notification"
- Bird: "bird chirp", "nature notification"
- Ticking: "clock tick", "metronome"
- White Noise: "white noise", "ambient noise"

---

## 🛠️ Quick Setup Instructions

### Option 1: Manual Download
1. Download 6 MP3 files from the sources above
2. Rename them to match the required filenames
3. Place them in the correct directories:
   ```
   public/sounds/alarms/bell.mp3
   public/sounds/alarms/digital.mp3
   public/sounds/alarms/bird.mp3
   public/sounds/ambient/ticking-fast.mp3
   public/sounds/ambient/ticking-slow.mp3
   public/sounds/ambient/white-noise.mp3
   ```

### Option 2: Generate Simple Sounds
You can use online tools to generate basic sounds:
- **Beeps/Tones**: [BeepBox.co](https://www.beepbox.co/)
- **White Noise**: [MyNoise.net](https://mynoise.net/)

---

## 📐 Technical Specifications

### File Requirements:
- **Format**: MP3 (primary)
- **Size**: < 100KB per file (recommended)
- **Sample Rate**: 44.1kHz or 48kHz
- **Bit Rate**: 
  - Alarms: 128kbps or lower
  - Ambient: 96kbps (looping sounds can be lower quality)
- **Length**:
  - Alarms: 1-3 seconds
  - Ambient: 1-5 seconds (will loop seamlessly)

### Loop Requirements for Ambient Sounds:
Make sure ticking and white noise sounds loop seamlessly:
- No click at loop point
- Same volume at start and end
- Use audio editing if needed (Audacity is free)

---

## 🧪 Testing

Once you add the sound files:

1. **Test Alarm Sounds**:
   - Go to Settings → Sounds & Notifications
   - Select different alarm sounds
   - Start a Pomodoro and let it complete
   - Verify the alarm plays

2. **Test Ticking Sounds**:
   - Go to Settings → Sounds & Notifications
   - Select a ticking sound (not "None")
   - Start a Focus session
   - Verify ticking plays during focus
   - Verify ticking stops when paused

3. **Test Volume Control**:
   - Adjust volume slider in Settings
   - Verify alarm respects volume
   - Verify ticking respects volume

4. **Test "None" Option**:
   - Set both to "None"
   - Verify no sounds play

---

## 🔧 How It Works

### Alarm Sound Flow:
```
Session completes → TimerDisplay detects completion → 
Looks up alarm sound from settings → Plays alarm once
```

### Ticking Sound Flow:
```
User starts Focus session → Timer becomes active →
Looks up ticking sound from settings → Loops sound →
User pauses/completes → Stops sound
```

### Code Integration:
```typescript
// In TimerDisplay.tsx
const alarmSoundPath = getAlarmSoundPath(userSettings.alarm_sound);
const { play: playAlarm } = useSound(alarmSoundPath, { volume: userSettings.volume });

// Play on completion
playAlarm(); // Plays the sound!

// Ticking sound (auto-managed)
useLoopingSound(tickingSoundPath, isActive && mode === 'focus', volume);
```

---

## 🐛 Troubleshooting

### Sound doesn't play?
1. Check browser console for errors
2. Verify file exists at the correct path
3. Check file format (must be MP3)
4. Try a different browser (Chrome recommended)
5. Check volume isn't set to 0

### Autoplay blocked?
- This is normal on first load
- User must interact with page first (click Start button)
- Sounds will work after first user interaction

### Sound cuts off?
- Check file isn't corrupted
- Verify file size isn't too large
- Check bit rate (lower is sometimes better)

---

## 📝 Future Enhancements (Optional)

You can later add:
- Sound preview in Settings page
- Custom sound upload
- More sound options
- Fade in/out effects
- Different alarms for breaks vs. focus

---

## 📂 Current File Structure

```
pomorix-frontend/
├── public/
│   └── sounds/
│       ├── README.md ✅
│       ├── alarms/
│       │   ├── bell.mp3 ❌ (you need to add)
│       │   ├── digital.mp3 ❌ (you need to add)
│       │   └── bird.mp3 ❌ (you need to add)
│       └── ambient/
│           ├── ticking-fast.mp3 ❌ (you need to add)
│           ├── ticking-slow.mp3 ❌ (you need to add)
│           └── white-noise.mp3 ❌ (you need to add)
└── src/
    ├── hooks/
    │   └── useSound.ts ✅
    ├── utils/
    │   └── soundMapper.ts ✅
    └── components/
        └── Timer/
            └── TimerDisplay.tsx ✅ (updated)
```

---

## ✨ Summary

The sound system is **fully implemented and ready to use**. Just add the 6 MP3 files and everything will work automatically!

The app will gracefully handle missing files (no errors), so you can add them one at a time if needed.
