# Tab Title Timer Feature - Implementation Summary

## Overview
Added a dynamic browser tab title that displays the Pomodoro timer countdown, allowing users to track their session even when on different tabs.

## What Was Implemented

### 1. Custom Hook: `useTabTitle.ts`
**Location:** `src/hooks/useTabTitle.ts`

**Features:**
- Updates browser tab title with remaining time in `MM:SS` format
- Shows different messages based on timer mode:
  - Focus: "25:00 - Time to focus!"
  - Short Break: "05:00 - Short break"
  - Long Break: "15:00 - Long break"
- Shows "(Paused)" when timer is paused
- Shows completion messages with emojis:
  - "🎉 Focus complete!" when focus session ends
  - "✅ Break complete!" when break session ends
- Restores original title when component unmounts
- Can be enabled/disabled via `enabled` prop

### 2. Integration in TimerDisplay
**Location:** `src/components/Timer/TimerDisplay.tsx`

Added the hook integration:
```typescript
useTabTitle({
  isActive,
  mode,
  secondsLeft,
  enabled: true
});
```

### 3. Export Configuration
**Location:** `src/hooks/index.ts`

Added export for the new hook to make it available throughout the app.

## How It Works

### Tab Title Format
- **When Running:** `MM:SS - Message`
  - Example: `25:00 - Time to focus!`
  - Example: `05:00 - Short break`
  
- **When Paused:** `MM:SS - Message (Paused)`
  - Example: `25:00 - Time to focus! (Paused)`
  
- **When Complete:** `🎉 Focus complete!` or `✅ Break complete!`

### Update Frequency
- Updates every second while timer is running
- Automatically syncs with the `secondsLeft` state from TimerDisplay

## User Benefits

1. **Multi-tasking:** Users can work on other tabs while tracking their Pomodoro session
2. **Visual Reminder:** The countdown in the tab serves as a constant reminder of the ongoing session
3. **Quick Glance:** No need to switch back to the Pomorix tab to check remaining time
4. **Professional Look:** Similar to popular Pomodoro apps like Focus To-Do, Pomofocus, etc.

## Example Scenarios

### Scenario 1: Focus Session
1. User starts a 25-minute focus session
2. Tab title shows: `25:00 - Time to focus!`
3. User switches to work on another tab
4. Timer continues counting down: `24:59 - Time to focus!`
5. After completion: `🎉 Focus complete!`

### Scenario 2: Break Session
1. User starts a 5-minute short break
2. Tab title shows: `05:00 - Short break`
3. User browses other tabs during break
4. Timer counts down: `04:59 - Short break`
5. After completion: `✅ Break complete!`

### Scenario 3: Paused State
1. User pauses the timer at 15:30
2. Tab title shows: `15:30 - Time to focus! (Paused)`
3. User can clearly see the timer is paused

## Technical Details

### Dependencies
- React hooks: `useEffect`, `useRef`
- No external dependencies

### Performance
- Minimal performance impact
- Uses React's built-in optimization
- Only updates when necessary (timer tick or state change)

### Browser Compatibility
- Works on all modern browsers
- Uses standard DOM API (`document.title`)

## Testing Recommendations

1. **Start a focus session** - Verify tab title updates correctly
2. **Switch to another tab** - Confirm you can still see the timer
3. **Pause the timer** - Check if "(Paused)" appears
4. **Complete a session** - Verify completion message shows
5. **Start break sessions** - Test short and long break displays
6. **Navigate away** - Ensure original title is restored

## Future Enhancements (Optional)

1. **Notifications:** Add browser notifications when session completes
2. **Favicon Animation:** Animate the favicon to show timer progress
3. **Custom Format:** Allow users to customize the tab title format in settings
4. **Blinking Title:** Add blinking effect on completion for attention

## Files Modified

1. ✅ Created: `src/hooks/useTabTitle.ts`
2. ✅ Modified: `src/hooks/index.ts` (added export)
3. ✅ Modified: `src/components/Timer/TimerDisplay.tsx` (integrated hook)

## Status
✅ **COMPLETE** - Feature is fully implemented and ready to use!

---
*Last Updated: December 31, 2025*
