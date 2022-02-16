import { ActionSheet, NavBar, Popup, Search } from "@antmjs/vantui";
import { FC } from "@tarojs/taro";
import { useCallback, useState } from "react";
import ShadowCard from "../../../../components/ShadowCard";

import { Center } from "../../../../components/Stack";
import ApplicationField from "./ApplicationField";

const AddButton: FC<{}> = props => {
  const {} = props;
  const [show, setShow] = useState(false);
  const hide = useCallback(() => {
    setShow(false);
  }, [setShow]);

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
        style="height: 80%;paddingTop:10px;"
        onClose={hide}
        closeable
      >
        <div style={{ paddingRight: "30px" }}>
          <Search
            value={""}
            shape="round"
            placeholder="搜索需要添加的组织"
            clearable
          />
        </div>
        <div style={{ width: "100%", paddingLeft: 20, paddingRight: 20 }}>
          <ShadowCard />
        </div>
      </Popup>
    </>
  );
};
export default AddButton;
