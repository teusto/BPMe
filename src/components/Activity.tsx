import { type IActivity } from "../App";
import styles from "../styles/Activity.module.scss";

interface ActivityProps {
    onClick: (activity: IActivity) => void;
    activity: IActivity;
    isActive: boolean;
}

const Activity = ({ onClick, activity, isActive }: ActivityProps) => {
    return (
        <div onClick={() => onClick(activity)} className={isActive ? styles.active : styles.activity}>
            <div>{activity.name}</div>
            <div>{activity.bpmRange[0]} - {activity.bpmRange[1]} BPM</div>
        </div>
    )
}

export default Activity;
