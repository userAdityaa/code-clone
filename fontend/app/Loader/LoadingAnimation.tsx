'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProgressBar = ({ duration }: any) => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: duration,
      ease: 'power1.inOut',
    });
  }, [duration]);

  return (
    <div className="progress-bar">
      <div ref={progressBarRef} className="progress-bar-line bg-white"></div>
    </div>
  );
};

export default ProgressBar;