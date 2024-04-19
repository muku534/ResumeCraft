// LottieAnimation.js

import Lottie from 'react-lottie';
import animationData from '../public/assets/Animation - 1713557513026.json';

const LottieAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <Lottie options={defaultOptions} height={400} width={400} />
        </div>
    )
};

export default LottieAnimation;
