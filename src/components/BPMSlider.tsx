import styles from '../styles/BPMSlider.module.scss';

interface BPMSliderProps {
    value: number;
    min?: number;
    max?: number;
    onchange: (value: number) => void;
}

const BPMSlider = ({ value, min = 60, max = 200, onchange }: BPMSliderProps) => {
    return (
        <div className={styles.BPMSlider}>
            <div className={styles.slider_container}>
                <input 
                    type='range'
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onchange(Number(e.target.value))}
                    className={styles.BPMSlider__input}
                />
                <div className={styles.slider_container__values}>
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>

        </div>
    )
}

export default BPMSlider;