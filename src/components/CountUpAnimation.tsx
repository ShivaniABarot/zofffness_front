import { useEffect, useRef } from 'react';

interface CountUpProps {
  targetValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUpAnimation = ({ targetValue, duration = 2000, prefix = '', suffix = '', className = '' }: CountUpProps) => {
  const countRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toFixed(0);
  };

  const startAnimation = () => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const progress = Math.min((currentTime - startTimeRef.current) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      const currentValue = Math.floor(easedProgress * targetValue);

      if (countRef.current) {
        countRef.current.textContent = `${prefix}${formatNumber(currentValue)}${suffix}`;
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      ref={countRef}
      className={`font-bold ${className}`}
      aria-label={`${prefix}${targetValue}${suffix}`}
    >
      {prefix}0{suffix}
    </div>
  );
};

export default CountUpAnimation;