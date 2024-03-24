import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CountingAnimation = ({ targetValue, triggerSelector }: { targetValue: number, triggerSelector: string }) => {
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const counter = counterRef.current;
    const target = +targetValue;

    if (counter) {
      const animation = gsap.to(counter, {
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%',
          end: 'bottom 20%',
          once: true,
        },
        innerHTML: target,
        roundProps: 'innerHTML',
        // duration: 1,
        delay: 1,
        snap: 'inner',
        onUpdate: function() {
          counter.innerHTML = Math.round(Number(counter.innerHTML)).toString();
        }
      });

      return () => {
        if (animation) {
          animation.kill();
        }
      };
    }
  }, [targetValue, triggerSelector]);

  return (
    <div className="counter text-[7rem] font-serif" ref={counterRef}>
      0
    </div>
  );
};

export default CountingAnimation;
