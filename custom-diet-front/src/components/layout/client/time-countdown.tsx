import { clearAllInterval } from "@/utils";
import { memo, useEffect, useState } from "react";

interface ITimeComponent {
    isStart: boolean;
    isComplete: boolean;
    isReset: boolean;
}

const RenderTime = ({ isStart, isComplete, isReset }: ITimeComponent) => {
    const [time, setTime] = useState(600);

    const updateTimer = () => {
        setTime((prevTime) => {
            if (prevTime === 0) {
                return 0;
            } else {
                return prevTime - 1;
            }
        });
    };


    useEffect(() => {
        let timer = setInterval(updateTimer, 1000);

        if (!isStart) {
            clearInterval(timer);
        } else {
            clearAllInterval()
            setTime(600)
            setInterval(updateTimer, 1000)
        }

        if (isComplete) {
            clearInterval(timer);
            setTime(0)
        }
    }, [isStart, isComplete, isReset]);

    return (
        <div className="time-countdown">
            <p>
                {`${Math.floor(time / 60)}`.padStart(2, '0')}:
                {`${time % 60}`.padStart(2, '0')}
            </p>
        </div>
    );
};

export default RenderTime;