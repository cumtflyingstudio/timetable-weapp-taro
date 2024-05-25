import { FC, useCallback, useState } from 'react';
import { Button, Icon, Popup, Search } from '@antmjs/vantui';
import TouchableOpacity from '../../../components/TouchableOpacity';
import defaultTheme from '../../../theme/defaultTheme';
import SliderItem from './SliderItem';
import { useGlobalCurrRoom } from '../../../hooks/useGlobalCurrRoom';

const Slider: FC = (props) => {
  const [show, setShow] = useState(false);
  const hide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const [keyword, setKeyword] = useState('');
  const { currRoom, roomList, setCurrRoom } = useGlobalCurrRoom();
  const onChangeKeyword = useCallback((text) => {
    setKeyword(text.detail);
  }, []);

  return (
    <div>
      <Button
        icon="wap-nav"
        onClick={() => setShow(true)}
        color="#4cc8b9"
        round={true}
      />
      <Popup
        show={show}
        position="left"
        onClose={() => setShow(false)}
        style={{ background: '#f6f7f9' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '75vw',
            height: '100vh',
          }}
        >
          <div
            style={{ display: 'flex', background: `${defaultTheme.deepGreen}` }}
          >
            <Search
              style={{ height: '50px', flex: 8 }}
              value={keyword}
              shape="round"
              placeholder="搜索该组织名下的场地"
              clearable
              onChange={onChangeKeyword}
              background={defaultTheme.deepGreen}
            />
            <div
              style={{
                height: '50px',
                width: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => {
                setShow((show) => !show);
              }}
            >
              <Icon name="close" size="20px" color="white" />
            </div>
          </div>

          <div
            style={{
              transform: `translateX(${show ? 0 : -200}px)`,
            }}
          >
            {Object.values(roomList)
              .filter((item) => item.roomName.includes(keyword))
              .map((item) => {
                const { roomId } = item;
                return (
                  <TouchableOpacity
                    key={item.roomId}
                    onClick={() => {
                      setCurrRoom(roomId);
                      hide();
                    }}
                  >
                    <SliderItem
                      room={item}
                      selected={currRoom.roomId === roomId}
                    />
                  </TouchableOpacity>
                );
              })}
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default Slider;
