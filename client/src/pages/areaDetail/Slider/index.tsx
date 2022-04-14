import { FC, useCallback, useState } from "react";
import { Button, Icon, Popup, Search } from "@antmjs/vantui";
import TouchableOpacity from "../../../components/TouchableOpacity";
import defaultTheme from "../../../theme/defaultTheme";
import { useCurrRoom } from "../useCurrRoom";
import SliderItem from "./SliderItem";

const Slider: FC = (props) => {
  const [show, setShow] = useState(false);
  const hide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  //搜索关键词
  const [keyword, setKeyword] = useState("");
  //标题
  const { store } = useCurrRoom();
  const onChangeKeyword = useCallback((text) => {
    setKeyword(text.detail);
  }, []);

  return (
    <div>
      <Button onClick={() => setShow(true)}>点我显示</Button>
      <Popup
        show={show}
        position="left"
        onClose={() => setShow(false)}
        style={{ background: "#f6f7f9" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "75vw",
            height: "100vh",
          }}
        >
          <div
            style={{ display: "flex", background: `${defaultTheme.deepGreen}` }}
          >
            <Search
              style={{ height: "50px", flex: 8 }}
              value=""
              shape="round"
              placeholder="搜索area"
              clearable
              onChange={onChangeKeyword}
              background={defaultTheme.deepGreen}
            />
            <div
              style={{
                height: "50px",
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            {store.rooms
              .filter((item) => item.roomName.includes(keyword))
              .map((item, index) => (
                <TouchableOpacity
                  key={item.roomId}
                  onClick={() => {
                    store.current = index;
                    hide();
                  }}
                >
                  <SliderItem room={item} selected={store.current === index} />
                </TouchableOpacity>
              ))}
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default Slider;
