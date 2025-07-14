import styles from "./styles/app.module.scss";
import React, { useState, useCallback, useMemo } from "react";
import Activity from "./components/Activity";
import BPMSlider from "./components/BPMSlider";
import usePlaylistGenerator from "./hooks/usePlaylistGenerator";

export interface IActivity {
  id: string;
  name: string;
  bpmRange: [number, number];
  icon: string;
}

export interface BPMRange {
  min: number;
  max: number;
  label: string;
  description: string;
}

const ACTIVITIES: IActivity[] = [
  { id: 'walking', name: 'Walking', icon: '🚶', bpmRange: [60, 80] },
  { id: 'running', name: 'Running', icon: '🏃‍♂️', bpmRange: [140, 180] },
  { id: 'cycling', name: 'Cycling', icon: '🚴', bpmRange: [120, 150] },
  { id: 'boxing', name: 'Boxing', icon: '🥊', bpmRange: [120, 140] },
  { id: 'yoga', name: 'Yoga', icon: '🧘', bpmRange: [80, 120] },
  { id: 'gym', name: 'Gym', icon: '💪', bpmRange: [120, 160] },
  { id: 'dance', name: 'Dance', icon: '💃', bpmRange: [128, 138] },
  { id: 'working', name: 'Working', icon: '💼', bpmRange: [60, 120] },
];

const BPM_RANGES: BPMRange[] = [
  { min: 60, max: 80, label: 'Warm-up', description: 'Gentle start' },
  { min: 80, max: 100, label: 'Walking', description: 'Casual pace' },
  { min: 100, max: 120, label: 'Light Cardio', description: 'Easy workout' },
  { min: 120, max: 140, label: 'Moderate Cardio', description: 'Steady rhythm' },
  { min: 140, max: 180, label: 'High Intensity', description: 'Push your limits' },
  { min: 60, max: 80, label: 'Cool Down', description: 'Recovery time' },
];

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [targetBPM, setTargetBPM] = useState<number>(120);

  const { isGenerating, generatePlaylist } = usePlaylistGenerator();

  const handleActivitySelect = useCallback((activity: IActivity) => {
    setSelectedActivity(activity);
    const avgBPM = Math.round((activity.bpmRange[0] + activity.bpmRange[1]) / 2);
    setTargetBPM(avgBPM);
  }, []);

  const handleGeneratePlaylist = useCallback(async () => {
    const songs = await generatePlaylist(targetBPM);
    console.log(songs);
  }, [targetBPM, generatePlaylist])

  const currentBPMRange = useMemo(() => {
    return BPM_RANGES.find(range => targetBPM >= range.min && targetBPM <= range.max);
  }, [targetBPM])

  return (
    <section className={styles.App}>
      <div className={styles.App__card_sides}>left</div>
      <div className={styles.App__card}>
        <div className={styles.App__card__header}>
          <h1>BPMe a playlist</h1>
          <p>Create the perfect playlist based on your activity and desired tempo</p>
        </div>
        <div className={styles.bpm}>
          <div className={styles.bpm_display}>{targetBPM} BPM</div>
          <BPMSlider value={targetBPM} onchange={setTargetBPM} />
        </div>
        <div className={styles.activity}>
          <div>Activity</div>
          <div className={styles.activity_options}>
            {ACTIVITIES.map(activity => (
              <Activity 
              key={activity.id} 
              onClick={handleActivitySelect} 
              activity={activity} 
              isActive={selectedActivity?.id === activity.id} />
            ))}
          </div>
        </div>

        <div className={styles.generate_playlist}>
          <button
            onClick={handleGeneratePlaylist}
            disabled={isGenerating}
            className={styles.generate_playlist__button}
          >
            {isGenerating ? 'Generating...' : 'Generate Playlist'}
          </button>
        </div>
      </div>
      <div className={styles.App__card_sides}>right</div>
    </section>
  );
};

export default App;