import { FC, useCallback, useRef, useState } from "react";

interface IAnimateView {
  activeStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const timerDelay = (delay = 200) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
const AnimateView: FC<IAnimateView> = (props) => {
  const { children, onClick, style, activeStyle = {} } = props;

  const timeout = useRef<Promise<null>>(Promise.resolve(null));
  const [currStyle, setCurrStyle] = useState<React.CSSProperties>({});
  const active = useCallback((flag: boolean = true) => {
    setCurrStyle(flag ? activeStyle : {});
  }, []);

  return (
    <div
      style={{
        transition: "all 0.2s ease",
        ...style,
        ...currStyle,
      }}
      onTouchStart={(e) => {
        active();
        timeout.current = new Promise(async (resolve) => {
          await timerDelay();
          resolve(null);
        });
      }}
      onTouchCancel={(e) => {
        //FIXME:这个取消touch没有作用
        timeout.current.then(() => {
          active(false);
          throw new Error("hello");
        });
        e.preventDefault();
      }}
      onTouchEnd={(e) => {
        timeout.current.then(() => {
          active(false);
          onClick && onClick();
        });
      }}
    >
      {children}
    </div>
  );
};
export default AnimateView;
