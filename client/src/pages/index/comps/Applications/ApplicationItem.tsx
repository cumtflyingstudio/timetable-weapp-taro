import { FC } from '@tarojs/taro';
import { useRouter } from 'taro-hooks';
import { Image } from '@antmjs/vantui';
import ApplicationField from './ApplicationField';
import { useCallback } from 'react';
import { useListContext } from '../../context';

const defaultApplicationAvatar = 'http://p.qlogo.cn/gh/786079617/786079617/0';

//封装了自动跳转到organizationDetail页面，和image
const ApplicationItem: FC<{ applicationItem: Application }> = (props) => {
  const { applicationItem: item } = props;
  const [_, { navigateTo }] = useRouter();

  const handleOpen = useCallback(() => {
    navigateTo(
      `/pages/RoomOrDevice/RoomOrDevice?name=${item.name}&id=${item._id}`,
    );
  }, []);
  const { dispatch } = useListContext();
  const handleDelete = useCallback(() => {
    dispatch({
      type: 'deleteApplication',
      payload: item._id,
    });
  }, [dispatch]);
  return (
    <ApplicationField
      name={item.name}
      onOpen={handleOpen}
      onDelete={handleDelete}
    >
      <Image
        src={item?.avatar || defaultApplicationAvatar}
        style={{ flex: 1 }}
      />
    </ApplicationField>
  );
};
export default ApplicationItem;
