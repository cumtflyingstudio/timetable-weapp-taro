import { useRequest } from 'taro-hooks';
import { OpenData } from '@tarojs/components';
import { Cell, CellGroup, Tag } from '@antmjs/vantui';
import Taro, { Config } from '@tarojs/taro';
import './my.less';
import Avatar from '../../components/Avatar';
import { HStack, VStack } from '../../components/Stack';
import getUserInfo from '../../service/user/getUserInfo';

export default function My() {
  const { data, loading } = useRequest(getUserInfo);
  return (
    <>
      <div
        style={{
          padding: 20,
          paddingTop: 0,
          paddingBottom: 20,
          borderRadius: 20,
        }}
      >
        <HStack>
          <Avatar size={150} />
          <VStack
            style={{
              width: 'auto',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 20,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 500 }}>
              <div>您好，{data?.nickname ?? 'user'}</div>
            </div>
            <div>
              <Tag>hello</Tag>
            </div>
          </VStack>
        </HStack>
      </div>
      <CellGroup title="个人信息" inset>
        <Cell title="昵称" size="large" value={data?.nickname} />
        <Cell
          title="学号"
          size="large"
          value={data?.username}
          // label="描述信息"
        />
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
