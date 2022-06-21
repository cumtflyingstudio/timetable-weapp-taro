import { Field, CellGroup, Cell, Calendar, Button } from '@antmjs/vantui';
import { Picker, View } from '@tarojs/components';
import react, { useState } from 'react';
import Taro, { Config } from '@tarojs/taro';
import { useNavigationBar, useRouter } from 'taro-hooks';
import askRoom from '../../service/room/askRoom';
import momentFormat from '../../utils/momentFormat';
import { useForm } from './useForm';
import showToast from '../../utils/showToast';
import './timeForm.less';
import askDevice from '../../service/device/askDevice';

const formatDate = (d: number) => {
  return momentFormat(new Date(d));
};
function Demo() {
  //来自上一个页面的参数
  const [routerInfo] = useRouter();
  const {
    title = '表单',
    organizationId = '',
    roomId = '',
    deviceId = '',
  } = routerInfo.params;
  const isDevice = deviceId !== '' && roomId === '';
  useNavigationBar({ title });
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(Date.now());
  const { store, reset } = useForm();
  return (
    <>
      <CellGroup>
        <Cell
          title="选择预约日期"
          value={formatDate(date)}
          onClick={() => setShow(true)}
        />
        <Calendar
          color="#4cc8b9"
          showConfirm={false}
          show={show}
          minDate={new Date().getTime()}
          maxDate={new Date().getTime() + 3600 * 1000 * 24 * 14}
          onClose={() => setShow(false)}
          onConfirm={(e) => {
            setDate(e.detail.value.valueOf() as number);
            setShow(false);
          }}
        />
        <Picker
          value={store.startTime}
          mode="time"
          onChange={(e) => {
            store.startTime = e.detail.value;
          }}
        >
          <Cell title="开始时间" value={store.startTime} />
        </Picker>
        <Picker
          value={store.endTime}
          mode="time"
          onChange={(e) => {
            store.endTime = e.detail.value;
          }}
        >
          <Cell title="结束时间" value={store.endTime} />
        </Picker>
        {isDevice ? (
          <Field
            label="数量"
            type="number"
            inputAlign="right"
            placeholder="请输入所需要的设备数量"
            border={false}
            value={store.num}
            onChange={(e) => {
              store.num = e.detail;
            }}
          />
        ) : null}
        <Field
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          autosize={{ minHeight: '100px' }}
          border={false}
          onChange={(e) => {
            store.applyInfo = e.detail;
          }}
        />
      </CellGroup>
      <Button
        onClick={() => {
          (isDevice ? askDevice : askRoom)({
            organizationId,
            usingId: isDevice ? deviceId : roomId,
            startTime: formatDate(date) + ' ' + store.startTime + ':00',
            endTime: formatDate(date) + ' ' + store.endTime + ':00',
            num: store.num,
            applyInfo: store.applyInfo,
          })
            .then((successMsg) => {
              reset();
              showToast(successMsg);
              setTimeout(() => {
                Taro.navigateBack();
              }, 1000);
            })
            .catch((e) => {
              showToast(e.message);
            });
        }}
        size="large"
        color="#4cc8b9"
        round
      >
        提交
      </Button>
    </>
  );
}

export default Demo;
