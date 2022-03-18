import { Search, Sidebar, SidebarItem, TreeSelect } from "@antmjs/vantui";
import Taro from "@tarojs/taro";
import "./areaDetail.less";
import { getAreaList } from "../../service";
import { useCallback, useState } from "react";

import { useNavigationBar, useRequest, useRouter } from "taro-hooks";
import defaultTheme from "../../theme/defaultTheme";

export default () => {
  const [chosenItem, setChosenItem] = useState("");
  //搜索关键词
  const [keyword, setKeyword] = useState("");
  //标题
  const [routerInfo] = useRouter();
  useNavigationBar({ title: routerInfo.params.name });

  // request:请求area列表
  const { data = [{ areaName: "加载中" }], error, loading } = useRequest(
    () => {
      // console.log(routerInfo.params.id);
      return getAreaList(routerInfo.params.id as string);
    },
    { cacheKey: `${routerInfo.params.id}_id_area`, staleTime: -1 }
  );

  const onChange = useCallback(text => {
    setKeyword(text.detail);
  }, []);

  const [show, setShow] = useState(true);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh"
        }}
      >
        <div>
          <Search
            style={{ height: "50px" }}
            value={""}
            shape="round"
            placeholder="搜索area"
            clearable
            onChange={onChange}
            background={defaultTheme.deepGreen}
          />
        </div>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          左
        </button>
        <div
          style={{
            transform: `translateX(${show ? 0 : -200}px)`
          }}
        >
          <Sidebar activeKey={0}>
            {(
              data?.filter(item => {
                return item.areaName.includes(keyword);
              }) || []
            ).map(item => {
              return <SidebarItem title={item.areaName} />;
            })}
          </Sidebar>
        </div>
      </div>
    </>
  );
};
