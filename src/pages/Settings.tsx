import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { settingsService } from '../services';
import { UserSettings, AlarmSound, TickingSound } from '../types';
import { ConfirmModal } from '../components/Common';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Local state for form inputs
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [alarmSound, setAlarmSound] = useState<AlarmSound>(AlarmSound.BELLS);
  const [tickingSound, setTickingSound] = useState<TickingSound>(TickingSound.NONE);
  const [volume, setVolume] = useState(50);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(true);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await settingsService.getUserSettings();
      setSettings(data);

      // Update local state with fetched values
      setPomodoroDuration(data.pomodoro_duration);
      setShortBreak(data.short_break);
      setLongBreak(data.long_break);
      setAlarmSound(data.alarm_sound);
      setTickingSound(data.ticking_sound);
      setVolume(data.volume);
      setAutoStartBreaks(data.auto_start_breaks);
      setAutoStartPomodoros(data.auto_start_pomodoros);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load settings');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const updates = {
        pomodoro_duration: pomodoroDuration,
        short_break: shortBreak,
        long_break: longBreak,
        alarm_sound: alarmSound,
        ticking_sound: tickingSound,
        volume: volume,
        auto_start_breaks: autoStartBreaks,
        auto_start_pomodoros: autoStartPomodoros,
      };

      const updatedSettings = await settingsService.updateUserSettings(updates);
      setSettings(updatedSettings);
      setSuccessMessage('Settings saved successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save settings');
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    setResetModalOpen(false);

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const resetSettings = await settingsService.resetToDefaults();
      setSettings(resetSettings);

      // Update local state with reset values
      setPomodoroDuration(resetSettings.pomodoro_duration);
      setShortBreak(resetSettings.short_break);
      setLongBreak(resetSettings.long_break);
      setAlarmSound(resetSettings.alarm_sound);
      setTickingSound(resetSettings.ticking_sound);
      setVolume(resetSettings.volume);
      setAutoStartBreaks(resetSettings.auto_start_breaks);
      setAutoStartPomodoros(resetSettings.auto_start_pomodoros);

      setSuccessMessage('Settings reset to defaults!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to reset settings');
      console.error('Error resetting settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[720px] mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text-secondary">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={resetModalOpen}
        title="Reset to Defaults?"
        message="Are you sure you want to reset all settings to their default values? This will restore timer durations, sounds, and automation settings."
        confirmText="Reset"
        cancelText="Cancel"
        onConfirm={handleResetDefaults}
        onCancel={() => setResetModalOpen(false)}
        isLoading={saving}
        variant="warning"
      />

      <div className="max-w-[720px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">error</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Timer Settings */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-text-main pb-2 border-b border-[#f0f2f4]">
            <span className="material-symbols-outlined text-primary">schedule</span>
            <h3 className="text-lg font-bold leading-tight font-display">Timer Settings</h3>
          </div>

          <div className="bg-white p-6 shadow-sharp border border-border-subtle">
            <div className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col flex-1">
                  <p className="text-text-main text-base font-medium">Pomodoro Duration</p>
                  <p className="text-text-secondary text-xs mt-1">Focus interval (30 min - 12 hours)</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="30"
                    max="720"
                    value={pomodoroDuration}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 30 && val <= 720) setPomodoroDuration(val);
                    }}
                    onBlur={(e) => {
                      const val = Number(e.target.value);
                      if (val < 30) setPomodoroDuration(30);
                      if (val > 720) setPomodoroDuration(720);
                    }}
                    disabled={saving}
                    className="w-20 px-3 py-1.5 text-sm font-bold text-text-main text-center border border-border-subtle focus:border-primary focus:outline-none"
                  />
                  <span className="text-text-secondary text-xs font-medium">min</span>
                </div>
              </div>
              <div className="flex h-6 w-full items-center">
                <input
                  className="w-full h-2 bg-border-subtle appearance-none cursor-pointer accent-primary"
                  max="720"
                  min="30"
                  type="range"
                  value={pomodoroDuration}
                  onChange={(e) => setPomodoroDuration(Number(e.target.value))}
                  disabled={saving}
                />
              </div>
              <div className="flex justify-between text-xs text-text-secondary font-mono">
                <span>30m</span>
                <span>12h</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 shadow-sharp border border-border-subtle">
              <div className="flex flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col flex-1">
                    <p className="text-text-main text-base font-medium">Short Break</p>
                    <p className="text-text-secondary text-xs mt-1">Max 2 hours</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={shortBreak}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= 1 && val <= 120) setShortBreak(val);
                      }}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < 1) setShortBreak(1);
                        if (val > 120) setShortBreak(120);
                      }}
                      disabled={saving}
                      className="w-20 px-3 py-1.5 text-sm font-bold text-text-main text-center border border-border-subtle focus:border-primary focus:outline-none"
                    />
                    <span className="text-text-secondary text-xs font-medium">min</span>
                  </div>
                </div>
                <div className="flex h-6 w-full items-center">
                  <input
                    className="w-full h-2 bg-border-subtle appearance-none cursor-pointer accent-primary"
                    max="120"
                    min="1"
                    type="range"
                    value={shortBreak}
                    onChange={(e) => setShortBreak(Number(e.target.value))}
                    disabled={saving}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-secondary font-mono">
                  <span>1m</span>
                  <span>2h</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-sharp border border-border-subtle">
              <div className="flex flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col flex-1">
                    <p className="text-text-main text-base font-medium">Long Break</p>
                    <p className="text-text-secondary text-xs mt-1">Max 4 hours</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="5"
                      max="240"
                      value={longBreak}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= 5 && val <= 240) setLongBreak(val);
                      }}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < 5) setLongBreak(5);
                        if (val > 240) setLongBreak(240);
                      }}
                      disabled={saving}
                      className="w-20 px-3 py-1.5 text-sm font-bold text-text-main text-center border border-border-subtle focus:border-primary focus:outline-none"
                    />
                    <span className="text-text-secondary text-xs font-medium">min</span>
                  </div>
                </div>
                <div className="flex h-6 w-full items-center">
                  <input
                    className="w-full h-2 bg-border-subtle appearance-none cursor-pointer accent-primary"
                    max="240"
                    min="5"
                    type="range"
                    value={longBreak}
                    onChange={(e) => setLongBreak(Number(e.target.value))}
                    disabled={saving}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-secondary font-mono">
                  <span>5m</span>
                  <span>4h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sounds & Notifications */}
        <section className="flex flex-col gap-6 pt-4">
          <div className="flex items-center gap-2 text-text-main pb-2 border-b border-[#f0f2f4]">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <h3 className="text-lg font-bold leading-tight font-display">Sounds & Notifications</h3>
          </div>
          <div className="bg-white shadow-sharp border border-border-subtle overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-text-secondary">volume_up</span>
                <span className="text-text-main font-medium">Alarm Sound</span>
              </div>
              <select
                className="bg-bg-page border border-border-subtle text-text-main text-sm focus:ring-1 focus:ring-primary py-2 pl-3 pr-8 cursor-pointer"
                value={alarmSound}
                onChange={(e) => setAlarmSound(e.target.value as AlarmSound)}
                disabled={saving}
              >
                <option value={AlarmSound.BELLS}>Bells</option>
                <option value={AlarmSound.DIGITAL}>Digital</option>
                <option value={AlarmSound.BIRD}>Bird</option>
                <option value={AlarmSound.NONE}>None</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-text-secondary">timer</span>
                <span className="text-text-main font-medium">Ticking Sound</span>
              </div>
              <select
                className="bg-bg-page border border-border-subtle text-text-main text-sm focus:ring-1 focus:ring-primary py-2 pl-3 pr-8 cursor-pointer"
                value={tickingSound}
                onChange={(e) => setTickingSound(e.target.value as TickingSound)}
                disabled={saving}
              >
                <option value={TickingSound.NONE}>None</option>
                <option value={TickingSound.TICKING_FAST}>Ticking Fast</option>
                <option value={TickingSound.TICKING_SLOW}>Ticking Slow</option>
                <option value={TickingSound.WHITE_NOISE}>White Noise</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex justify-between items-center">
                <span className="text-text-main font-medium text-sm">Volume</span>
                <span className="text-text-secondary text-xs">{volume}%</span>
              </div>
              <input
                className="w-full h-1.5 bg-border-subtle appearance-none cursor-pointer accent-primary"
                max="100"
                min="0"
                type="range"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                disabled={saving}
              />
            </div>
          </div>
        </section >

        {/* Automation */}
        < section className="flex flex-col gap-6 pt-4" >
          <div className="flex items-center gap-2 text-text-main pb-2 border-b border-[#f0f2f4]">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h3 className="text-lg font-bold leading-tight font-display">Automation</h3>
          </div>
          <div className="bg-white shadow-sharp border border-border-subtle overflow-hidden divide-y divide-border-subtle">
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-text-main text-sm font-medium">Auto-start Breaks</p>
                <p className="text-text-secondary text-xs">Automatically start break timer when pomodoro ends</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  className="sr-only peer"
                  type="checkbox"
                  checked={autoStartBreaks}
                  onChange={(e) => setAutoStartBreaks(e.target.checked)}
                  disabled={saving}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-text-main text-sm font-medium">Auto-start Pomodoros</p>
                <p className="text-text-secondary text-xs">Automatically start next pomodoro when break ends</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  className="sr-only peer"
                  type="checkbox"
                  checked={autoStartPomodoros}
                  onChange={(e) => setAutoStartPomodoros(e.target.checked)}
                  disabled={saving}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section >

        {/* Action Buttons */}
        < div className="sticky bottom-4 z-10 mt-8" >
          <div className="bg-white/80 backdrop-blur-sm p-4 border border-border-subtle shadow-lg flex justify-end gap-3">
            <button
              className="px-6 py-2.5 text-sm font-medium text-text-main bg-transparent hover:bg-bg-page border border-border-subtle transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setResetModalOpen(true)}
              disabled={saving}
            >
              Reset Defaults
            </button>
            <button
              className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-sharp transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleSaveChanges}
              disabled={saving}
            >
              {saving && <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div >
      </div >
    </>
  );
};

export default Settings;
