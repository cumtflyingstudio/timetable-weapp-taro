import Taro, { Config } from "@tarojs/taro";
import "./my.less";
import Avatar from "../../components/Avatar";
import { Cell, CellGroup, Tag } from "@antmjs/vantui";
import { HStack, VStack } from "../../components/Stack";
import { OpenData } from "@tarojs/components";

export default function My() {
  return (
    <>
      <div
        style={{
          padding: 20,
          paddingTop: 0,
          paddingBottom: 20,
          borderRadius: 20
        }}
      >
        <HStack>
          <Avatar size={150} />
          <VStack
            style={{
              width: "auto",
              // flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: 20
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 500 }}>
              <OpenData type="userNickName" />
            </div>
            <div>
              <Tag>hello</Tag>
            </div>
          </VStack>
        </HStack>
      </div>
      <CellGroup title="个人信息" inset>
        <Cell title="昵称" size="large" />
        <Cell title="学号" size="large" label="描述信息" />
      </CellGroup>
      <CellGroup title="管理区" inset>
        <Cell title="姓名" isLink size="large" />
        <Cell title="关于" isLink size="large" />
        <Cell
          title="单元格"
          isLink
          value="内容"
          arrowDirection="down"
          size="large"
        />
      </CellGroup>
    </>
  );
}
