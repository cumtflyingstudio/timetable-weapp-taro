import { FC, useCallback, useState } from 'react';
import { Button, Icon, Popup, Search } from '@antmjs/vantui';
import TouchableOpacity from '../../../components/TouchableOpacity';
import defaultTheme from '../../../theme/defaultTheme';
import { useCurrRoomStore } from '../useCurrRoomStore';
import SliderItem from './SliderItem';

const Slider: FC = (props) => {
  const [show, setShow] = useState(false);
  const hide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  //搜索关键词
  const [keyword, setKeyword] = useState('');
  //标题
  const { store } = useCurrRoomStore();
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
              value=""
              shape="round"
              placeholder="搜索area"
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
            {Object.values(store.rooms)
              .filter((item) => item.roomName.includes(keyword))
              .map((item, index) => (
                <TouchableOpacity
                  key={item.roomId}
                  onClick={() => {
                    store.currentId = item.roomId;
                    hide();
                  }}
                >
                  <SliderItem
                    room={item}
                    selected={store.currentId === item.roomId}
                  />
                </TouchableOpacity>
              ))}
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default Slider;
