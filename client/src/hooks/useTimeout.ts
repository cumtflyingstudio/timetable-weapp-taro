import { useRef } from "react";

const useTimeout = (delay = 300, callback = () => {}) => {
  const timer = useRef(null as any);

  const start = () => {
    timer.current = setTimeout(() => {
      callback();
    }, delay);
  };
  const stop = () => {
    clearTimeout(timer.current);
    timer.current = 0;
  };

  return [start, stop];
};

export default useTimeout;
