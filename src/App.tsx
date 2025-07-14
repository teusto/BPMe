import styles from "./styles/app.module.scss";
import React, { useState, useCallback, useMemo } from "react";

interface Activity {
  id: string;
  name: string;
  bpmRange: [number, number];
  icon: string;
}

interface BPMRange {
  min: number;
  max: number;
  label: string;
  description: string;
}

const BPM_RANGES: BPMRange[] = [
  { min: 60, max: 80, label: 'Warm-up', description: 'Gentle start' },
  { min: 80, max: 100, label: 'Walking', description: 'Casual pace' },
  { min: 100, max: 120, label: 'Light Cardio', description: 'Easy workout' },
  { min: 120, max: 140, label: 'Moderate Cardio', description: 'Steady rhythm' },
  { min: 140, max: 180, label: 'High Intensity', description: 'Push your limits' },
  { min: 60, max: 80, label: 'Cool Down', description: 'Recovery time' },
];

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [targetBPM, setTargetBPM] = useState<number>(120);

  const handleActivitySelect = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
    const avgBPM = Math.round((activity.bpmRange[0] + activity.bpmRange[1]) / 2);
    setTargetBPM(avgBPM);
  }, []);

  const currentBPMRange = useMemo(() => {
    return BPM_RANGES.find(range => targetBPM >= range.min && targetBPM <= range.max);
  }, [targetBPM])

  return (
    <section className={styles.App}>
      <div className={styles.App__card_sides}>left</div>
      <div className={styles.App__card}>
        <div>
          <h1>BPMe a playlist</h1>
          <p>Create the perfect playlist based on your activity and desired tempo</p>
        </div>
        <div className={styles.bpm}>
          <div className={styles.bpm_display}>120 BPM</div>
          <input type="range" id="bpm-slider" className={styles.bpm_slider} min="60" max="200" value="120" />
        </div>
        <div className={styles.activity}>
          <div>Activity</div>
          <div className={styles.activity_options}>
            <div>Workout</div>
            <div>Running</div>
            <div>Cycling</div>
            <div>Walking</div>
            <div>Yoga</div>
            <div>Meditation</div>
            <div>Swimming</div>
            <div>Working</div>
          </div>
        </div>
      </div>
      <div className={styles.App__card_sides}>right</div>
    </section>
  );
};

export default App;