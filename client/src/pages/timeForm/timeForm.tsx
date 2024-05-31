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
import moment from 'moment';
import { forceRefresh } from '../../hooks/useSubscribeForceRefresh';
import { useGlobalUserInfo } from '../../hooks/useGlobalUserInfo';

const formatDate = (d: number) => {
  return momentFormat(new Date(d), 'YYYY-MM-DD');
};

/**
 * @param timeString e.g: 15:30
 */
function toTimeStamp(date: number, timeString: string): number {
  const [hours, minutes] = timeString.split(':');
  const timestamp = moment(date).set({
    hour: parseInt(hours, 10),
    minute: parseInt(minutes, 10),
    second: 0, // 可以设置秒为0，如果需要的话
    millisecond: 0, // 同样可以设置毫秒为0
  });

  // 获取时间戳，`unix()`返回的是秒级别的时间戳
  // const unixTimestampInSeconds = timestamp.unix();

  // 如果你需要毫秒级别的时间戳，使用`valueOf()`
  const unixTimestampInMilliseconds = timestamp.valueOf();

  return unixTimestampInMilliseconds;
}
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
  const { userInfo } = useGlobalUserInfo();
  return (
    <>
      <CellGroup>
        <Cell
          title="选择预约日期"
          required
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
          <Cell required title="开始时间" value={store.startTime} />
        </Picker>
        <Picker
          value={store.endTime}
          mode="time"
          onChange={(e) => {
            store.endTime = e.detail.value;
          }}
        >
          <Cell required title="结束时间" value={store.endTime} />
        </Picker>
        {isDevice ? (
          <Field
            label="数量"
            required
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
        <Cell
          title="联络方式"
          required
          clickable
          value={userInfo.phone ?? ''}
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/editInput/editInput?fieldName=phone`,
            });
          }}
        />
        <Field
          required
          label="留言"
          type="textarea"
          placeholder="可输入预约用途、陪同人员"
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
            organizationId: Number(organizationId),
            resourceId: Number(isDevice ? deviceId : roomId),
            startTime: toTimeStamp(date, store.startTime),
            endTime: toTimeStamp(date, store.endTime),
            num: store.num,
            applyInfo: store.applyInfo,
          })
            .then((successMsg) => {
              reset();
              showToast(successMsg);
              forceRefresh();
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
