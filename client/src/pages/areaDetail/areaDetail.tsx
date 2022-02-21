import { Search, Sidebar, SidebarItem } from "@antmjs/vantui";
import Taro, { Config } from "@tarojs/taro";
import "./areaDetail.less";
import { getOrganizationList } from "../../service";
import { useCallback, useEffect, useState } from "react";
import { HStack, VStack } from "../../components/Stack";

export default () => {
  const [list, setList] = useState([{ name: "加载中" }]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    getOrganizationList().then(res => {
      setList(res);
    });
  }, []);
  const onChange = useCallback(text => {
    setKeyword(text.detail);
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Search
          value={""}
          shape="round"
          placeholder="搜索area"
          clearable
          onChange={onChange}
        />
        <HStack style={{ flex: 1 }}>
          <Sidebar activeKey={0}>
            {list
              .filter(item => {
                return item.name.includes(keyword);
              })
              .map(item => {
                return <SidebarItem title={item.name} />;
              })}
          </Sidebar>
          <div
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start"
            }}
          >
            <div>hello</div>
            <div>hello2</div>
          </div>
        </HStack>
      </div>
    </>
  );
};
