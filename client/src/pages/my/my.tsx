import { useRequest } from 'taro-hooks';
import { Cell, CellGroup, Tag, Button } from '@antmjs/vantui';
import Taro, { Config } from '@tarojs/taro';
import './my.less';
import Avatar from '../../components/Avatar';
import { HStack, VStack } from '../../components/Stack';
import getUserInfo from '../../service/user/getUserInfo';
import AdminCellGroup from './comps/AdminCellGroup';
import testAdmin from '../../service/admin/testAdmin';
import { showToast } from '../../utils';
import { useEffect } from 'react';
import { useGlobalUserInfo } from '../../hooks/useGlobalUserInfo';

export default function My() {
  const { data, loading, error } = useRequest(getUserInfo);
  const { data: adminList } = useRequest(testAdmin);
  const isAdmin = Array.isArray(adminList) && adminList.length > 0;
  const { userInfo, setUserInfo } = useGlobalUserInfo();

  const { nickname, phone, username } = userInfo;

  useEffect(() => {
    if (!(loading || error) && data) {
      setUserInfo((draft) => {
        draft.username = data?.username ?? '';
        draft.nickname = data?.nickname ?? '';
        draft.phone = data?.phone ?? '';
      });
    }
  }, [data]);

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
              <div>您好，{nickname ?? '用户'}</div>
            </div>
            <div style={{ width: '50vw' }}>
              {adminList?.map((i) => {
                return (
                  <Tag key={i} style={{ marginRight: '10px' }}>
                    {i}负责人
                  </Tag>
                );
              })}
            </div>
          </VStack>
        </HStack>
      </div>
      <CellGroup title="个人信息" inset>
        <Cell
          title="昵称"
          clickable
          size="large"
          value={nickname ?? ''}
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/editInput/editInput?fieldName=nickname`,
            });
          }}
        />
        <Cell
          title="联系方式"
          clickable
          size="large"
          value={phone ?? ''}
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/editInput/editInput?fieldName=phone`,
            });
          }}
        />
        <Cell
          title="用户名"
          clickable
          size="large"
          value={data?.username}
          onClick={() => {
            showToast('用户名不可修改');
          }}
        />
      </CellGroup>
      {isAdmin ? <AdminCellGroup /> : null}
      <div style={{ width: '100vw', padding: '40rpx', marginTop: '40rpx' }}>
        <Button
          type="danger"
          plain
          size="large"
          round
          hairline
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
