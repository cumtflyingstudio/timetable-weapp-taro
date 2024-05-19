import { FC, useCallback, useRef, useState } from 'react';
import { useLatest } from '../../hooks/useLatest';

interface IAnimateView {
  activeStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLongPress?: () => void;
}

const timerDelay = (delay = 200) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
const AnimateView: FC<IAnimateView> = (props) => {
  const { children, onClick, onLongPress, style, activeStyle = {} } = props;

  const timeout = useRef<Promise<null>>(Promise.resolve(null));
  const [touching, setTouching] = useState<boolean>(false);
  const [longPressing, setLongPressing] = useState<boolean>(false);

  const isTouching = useRef(touching);
  isTouching.current = touching;

  const isLongPressing = useRef(longPressing);
  isLongPressing.current = longPressing;

  const lastDate = useRef(Date.now());
  const handleTouchStart = useCallback(() => {
    setTouching(true);
    setTimeout(() => {
      if (isTouching.current) {
        setLongPressing(true);
      }
    }, 1500);
    timeout.current = new Promise(async (resolve) => {
      await timerDelay();
      resolve(null);
    });
    lastDate.current = Date.now();
  }, [setTouching, setLongPressing]);

  const handleTouchEnd = useCallback(
    (e) => {
      timeout.current.then(() => {
        setTouching(false);
        setLongPressing(false);
        if (Date.now() - lastDate.current > 1500) {
          onLongPress && onLongPress();
        } else {
          onClick && onClick();
        }
        timeout.current;
      });
    },
    [setTouching, setLongPressing, onClick, onLongPress],
  );

  return (
    <div
      style={{
        transition: 'all 0.2s ease',
        ...style,
        ...(touching ? activeStyle : {}),
        ...(longPressing ? { background: 'black' } : {}),
      }}
      onTouchStart={handleTouchStart}
      onTouchCancel={(e) => {
        //FIXME:这个取消touch没有作用
        timeout.current.then(() => {
          setTouching(false);
          throw new Error('hello');
        });
        e.preventDefault();
      }}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};
export default AnimateView;
