import { FC } from '@tarojs/taro';
import moment from 'moment';
import momentFormat from '../../../utils/momentFormat';
import { useCallback } from 'react';
import type { TimeStage } from '../../../service/room/queryRoomUsing';

const timeAxleList = (function () {
  const res: number[] = [];
  for (let i = 0; i <= 24; i++) {
    res.push(i * 60 * 60 * 1000);
  }
  return res;
})();
const ONE_DAY = 1000 * 60 * 60 * 24;
const getTimeOneDay = (time: Date) => {
  if (!(time instanceof Date)) {
    time = new Date(time);
  }
  return time.getTime() % ONE_DAY;
};

const TimePaintTable: FC<{
  list: TimeStage[];
  onClick: (item: TimeStage) => void;
}> = (props) => {
  const { list, onClick } = props;

  const handleClick = useCallback((item: TimeStage) => {
    onClick(item);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '110vh',
        position: 'relative',
        display: 'flex',
        marginLeft: '5rpx',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: 0,
        }}
      >
        {timeAxleList.map((item) => {
          const time = moment(item - 8 * 60 * 60 * 1000).format('HH:mm');
          return (
            <div
              style={{
                top: `calc( ${((item / ONE_DAY) * 100) % 101}vh - 10px )`,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'absolute',
                width: '100%',
                minHeight: 0,
              }}
              key={item}
            >
              {/* 最左侧的时间刻度 e.g 18:00 */}
              <div
                style={{
                  width: '80rpx',
                  color: 'gray',
                  fontFamily: 'Helvetica, sans-serif',
                }}
              >
                {time}
              </div>

              {/* 辅助线横线 */}
              <div
                style={{
                  height: '1px',
                  minHeight: 0,
                  background: 'gray',
                  opacity: 0.3,
                  flex: 1,
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div style={{ width: '80rpx' }}></div>
      <div style={{ flex: 1, position: 'relative' }}>
        {/* 每个时间区间 */}
        {list.map((item) => {
          const { startTime, endTime } = item;
          const start = getTimeOneDay(startTime) + 8 * 60 * 60 * 1000;
          const end = getTimeOneDay(endTime) + 8 * 60 * 60 * 1000;
          const top = ((start / ONE_DAY) * 100) % 100;
          const height = (((end - start) / ONE_DAY) * 100) % 100;
          return (
            <div
              style={{
                top: top + 'vh',
                height: height + 'vh',
                background: 'skyblue',
                opacity: 0.2,
                position: 'absolute',
                width: '100%',
                borderTop: '1px solid blue',
                borderBottom: '1px solid blue',
              }}
              onClick={() => handleClick(item)}
              key={start}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-17px',
                  left: '0px',
                  color: 'blue',
                  fontSize: '12px',
                  minHeight: 0,
                  minWidth: 0,
                  fontWeight: 'bold',
                }}
              >
                {momentFormat(startTime, 'HH:mm')}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  // 当高度太小的时候，字会叠在一起
                  left: height < 5 ? '60px' : '0px',
                  color: 'blue',
                  fontSize: '12px',
                  minHeight: 0,
                  minWidth: 0,
                  fontWeight: 'bold',
                }}
              >
                {momentFormat(endTime, 'HH:mm')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TimePaintTable;
