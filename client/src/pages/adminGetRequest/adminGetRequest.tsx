import { Dialog, Field } from '@antmjs/vantui';
import { Input } from '@tarojs/components';
import { useRouter } from 'taro-hooks';
import Taro, { Config } from '@tarojs/taro';
import { Component, useCallback } from 'react';
import './adminGetRequest.less';
import getRoomForm from '../../service/admin/getRoomForm';
import { TimetableListPage } from '../timetable/TimetableListPage';
import { IForm } from '../../service/user/getMyForm';
import usePiniadux from '../../piniadux/src/hooks/usePiniadux';
import dealForm from '../../service/admin/dealForm';
import showToast from '../../utils/showToast';

// const alert = useCallback((item: IForm) => {
//   console.log(item.dealInfo);
//   Dialog.alert({
//     title: item.applyInfo,
//     message: item.dealInfo ?? 'hello',
//     selector: '#TimetableListPage',
//     closeable: true,
//     confirmButtonText: '通过',
//     cancelButtonText: '拒绝',
//     showCancelButton: true,
//     closeIconPosition: 'top-right',
//     closeOnClickOverlay: true,
//   }).then((value) => {
//     switch (value) {
//       case 'confirm':
//         console.log('confirm');
//         break;
//       case 'cancel':
//         console.log('cancel');
//         break;
//     }
//   });
// }, []);
const useStore = () =>
  usePiniadux('TimetableListPage-admin', {
    state() {
      return {
        show: false,
        item: {
          applyInfo: '',
          dealInfo: '',
        } as IForm,
        inputValue: '',
      };
    },
  });
export default () => {
  const { store } = useStore();
  return (
    <>
      <TimetableListPage
        requestFunc={getRoomForm}
        onClick={(i) => {
          store.item = i;
          store.show = true;
        }}
      />

      <Dialog
        show={store.show}
        overlay
        closeOnClickOverlay
        id="TimetableListPage-admin"
        confirmButtonText="通过"
        cancelButtonText="拒绝"
        closeable
        showCancelButton
        closeIconPosition="top-right"
        title={store.item?.applyInfo ?? '申请信息'}
        onClose={() => {
          store.show = false;
        }}
        onConfirm={() => {
          if (store.item.status === 2) {
            dealForm({
              status: 1,
              applyId: store.item.applyId,
              dealInfo: store.inputValue,
              kind: store.item.kind,
            })
              .then((message) => {
                showToast(message);
                Taro.startPullDownRefresh();
              })
              .catch((e) => {
                Taro.startPullDownRefresh();
                showToast(e.message);
              });
          }
        }}
        onCancel={() => {
          if (store.item.status === 2) {
            dealForm({
              status: 0,
              applyId: store.item.applyId,
              dealInfo: store.inputValue,
              kind: store.item.kind,
            })
              .then((message) => {
                showToast(message);
                Taro.startPullDownRefresh();
              })
              .catch((e) => {
                Taro.startPullDownRefresh();
                showToast(e.message);
              });
          }
        }}
      >
        <Field
          label="回复信息"
          placeholder="输入回复信息"
          value={store.inputValue}
          onChange={(e) => {
            store.inputValue = e.detail;
          }}
        />
      </Dialog>
    </>
  );
};
