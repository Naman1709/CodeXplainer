import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export const Spinner = ({ message }) =>{
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-amber-600"></div>
            {message && (
                <span className="ml-2.5 flex items-center">
                    {message}
                    <span className="inline-block w-6 text-left">
                        <AnimatedDots />
                    </span>
                </span>
            )}
        </div>
    )
}

Spinner.propTypes = {
    message: PropTypes.string
};

export const AnimatedDots = () => {
    const [dots, setDots] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);
    return <span>{dots}</span>;
};