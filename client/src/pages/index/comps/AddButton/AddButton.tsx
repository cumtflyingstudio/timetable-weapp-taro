import { Popup, Search } from "@antmjs/vantui";
import { FC } from "@tarojs/taro";
import { Context } from "konva/lib/Context";
import { useCallback, useRef, useState } from "react";

import { Center } from "../../../../components/Stack";
import ApplicationField from "../Applications/ApplicationField";
import CardList from "./CardList";
import Card from "./CardList/CardItem";
import { hideContext } from "./Context/hideContext";

const AddButton: FC<{}> = props => {
  const {} = props;
  const [show, setShow] = useState(false);
  const hide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const [keyWord, setKeyWord] = useState("");

  const onKeyWordChange = useCallback(e => {
    setKeyWord(e.detail);
  }, []);
  return (
    <>
      <ApplicationField name={"添加组织"}>
        <Center
          style={{
            flex: 1,
            background: "transparent",
            border: "3px dashed gray",
            overflow: "hidden",
            opacity: 0.7,
            borderRadius: 20
          }}
          onTouchStart={() => {
            setShow(true);
            return;
          }}
        >
          <div
            style={{
              flex: 1,
              fontSize: 35,
              fontWeight: 500,
              lineHeight: "80%",
              textAlign: "center",
              color: "gray"
            }}
          >
            +
          </div>
        </Center>
      </ApplicationField>
      <Popup
        safeAreaInsetBottom={false}
        safeAreaInsetTop={false}
        show={show}
        round={true}
        position="bottom"
        style="height: 80%;padding-top:10px;"
        onClose={hide}
        closeable
      >
        {/* 搜索框 */}
        <div style={{ paddingRight: "30px" }}>
          <Search
            value={keyWord}
            shape="round"
            placeholder="搜索需要添加的组织"
            clearable
            onSearch={onKeyWordChange}
            onChange={onKeyWordChange}
          />
        </div>
        {/* application添加卡片 */}
        <hideContext.Provider value={hide}>
          <CardList keyWord={keyWord} />
        </hideContext.Provider>
      </Popup>
    </>
  );
};
export default AddButton;
