import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CountDown = ({ initialDays }) => {
    const initialSeconds = initialDays * 24 * 60 * 60; // Convert days to seconds
    const [countdown, setCountdown] = useState(initialSeconds);
    const timerId = useRef();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    const formatTime = (time) => {
        const days = Math.floor(time / (3600 * 24));
        const hours = Math.floor((time % (3600 * 24)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return {
            days: days < 10 ? `0${days}` : days,
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds
        };
    };

    const { days, hours, minutes, seconds } = formatTime(countdown);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
            alert("Countdown ended!");
        }
    }, [countdown]);

    return (
        <div className='my-10'>
            <div className='bg-pink-200 rounded-lg p-20 text-center space-y-2'>
                <h2 className='text-black text-2xl uppercase'>--flash Sale--</h2>
                <p className='text-black text-l'>Great Promotions,save up to 35%! Only for a shoet time</p>
                <div className=''>
                    <div className="grid grid-flow-col gap-5 t
                    ext-center auto-cols-max justify-center">
                        <div className="flex flex-col p-2 bg-black rounded-box text-neutral-content">
                            <span className="font-mono text-5xl">{days}</span>
                            days
                        </div>
                        <div className="flex flex-col p-2 bg-black rounded-box text-neutral-content">
                            <span className="font-mono text-5xl">{hours}</span>
                            hours
                        </div>
                        <div className="flex flex-col p-2 bg-black rounded-box text-neutral-content">
                            <span className="font-mono text-5xl">{minutes}</span>
                            min
                        </div>
                        <div className="flex flex-col p-2 bg-black rounded-box text-neutral-content">
                            <span className="font-mono text-5xl">{seconds}</span>
                            sec
                        </div>
                    </div>
                </div>

                <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>
            </div>

        </div>
    );
};

export default CountDown;
