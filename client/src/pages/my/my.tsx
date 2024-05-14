import { useRequest } from 'taro-hooks';
import { OpenData } from '@tarojs/components';
import { Cell, CellGroup, Tag, Button } from '@antmjs/vantui';
import Taro, { Config } from '@tarojs/taro';
import './my.less';
import Avatar from '../../components/Avatar';
import { HStack, VStack } from '../../components/Stack';
import getUserInfo from '../../service/user/getUserInfo';
import AdminCellGroup from './comps/AdminCellGroup';
import testAdmin from '../../service/admin/testAdmin';

export default function My() {
  const { data, loading } = useRequest(getUserInfo);
  const { data: adminList } = useRequest(testAdmin);
  const isAdmin = Array.isArray(adminList);

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
            <div style={{ width: '50vw' }}>
              {adminList?.map((i) => {
                return <Tag style={{ marginRight: '10px' }}>{i}负责人</Tag>;
              })}
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
      {isAdmin ? <AdminCellGroup /> : null}
      <div style={{ width: '100vw', padding: '40rpx', marginTop: '40rpx' }}>
        <Button
          type="danger"
          plain
          size="large"
          round
          onClick={() => {
            Taro.showModal({
              title: '退出',
              content: '确认退出登录吗？',
              success: function (res) {
                if (res.confirm) {
                  Taro.clearStorageSync();
                  Taro.reLaunch({
                    url: '/pages/login/login',
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              },
            });
          }}
        >
          退出登录
        </Button>
      </div>
    </>
  );
}
