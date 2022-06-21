import { Dialog } from '@antmjs/vantui';
import { FC } from '@tarojs/taro';
import moment from 'moment';
import getUserInfo from '../../../service/user/getUserInfo';

interface ITimeStage {
  startTime: Date;
  endTime: Date;
}
const timeAxleList = (function () {
  const res: number[] = [];
  for (let i = 0; i <= 23; i++) {
    res.push(i * 60 * 60 * 1000);
  }
  return res;
})();
const ONEDAY = 1000 * 60 * 60 * 24;
const getTimeOneDay = (time: Date) => {
  if (!(time instanceof Date)) {
    time = new Date(time);
  }
  return time.getTime() % ONEDAY;
};
const TimePaintTable: FC<{ list: ITimeStage[] }> = (props) => {
  const { list } = props;
  const total = ONEDAY;
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
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
          const time = moment(item).format('HH:mm');
          return (
            <div
              style={{
                top: `calc( ${((item / total) * 100) % 100}vh - 10px )`,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'absolute',
                width: '100%',
                minHeight: 0,
              }}
              key={item}
            >
              <div style={{ minHeight: 0, minWidth: 0 }}>{time}</div>
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
      <div style={{ width: '75rpx' }}></div>
      <div style={{ flex: 1 }}>
        {list.map(({ startTime, endTime }) => {
          const start = getTimeOneDay(startTime);
          const end = getTimeOneDay(endTime);
          return (
            <div
              style={{
                top: (((start / total) * 100) % 100) + 'vh',
                height: ((((end - start) / total) * 100) % 100) + 'vh',
                background: 'skyblue',
                opacity: 0.2,
                position: 'absolute',
                width: '100%',
                borderTop: '1px solid blue',
                borderBottom: '1px solid blue',
              }}
              key={start}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '0px',
                  color: 'blue',
                  fontSize: '12px',
                  minHeight: 0,
                  minWidth: 0,
                  fontWeight: 'bold',
                }}
              >
                {moment(startTime).format('HH:mm')}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '0px',
                  color: 'blue',
                  fontSize: '12px',
                  minHeight: 0,
                  minWidth: 0,
                  fontWeight: 'bold',
                }}
              >
                {moment(endTime).format('HH:mm')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TimePaintTable;
