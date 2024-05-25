import { Dialog } from '@antmjs/vantui';
import Taro from '@tarojs/taro';
import getRoomUsing, { IForm } from '../../service/user/getRoomUsing';
import { useTimetableList } from './useTimetableList';
import './timetable.less';
import { TimetableListPage } from './TimetableListPage';

export default () => {
  const { store } = useTimetableList();
  return (
    <>
      <TimetableListPage
        requestFunc={getRoomUsing}
        onChange={(data) => {
          store.forms = data;
        }}
        onClick={(item) => {
          Dialog.alert({
            title: item.note,
            message:
              item.status !== 2
                ? `管理员处理了你的申请\n${item.dealInfo ?? '无留言'}`
                : `待审核阶段` +
                  (item.kind === '设备' ? `共${item.num}个` : ''),
            selector: '#TimetableListPage',
          }).then((value) => {
            console.log('用户点击了', value);
          });
        }}
      />
      <Dialog
        overlay
        closeOnClickOverlay
        id="TimetableListPage"
        confirmButtonText="通过"
        cancelButtonText="拒绝"
      ></Dialog>
    </>
  );
};
