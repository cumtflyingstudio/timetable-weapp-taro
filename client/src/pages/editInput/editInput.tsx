import React, { Component, useCallback, useState } from 'react';
import Taro, { Config } from '@tarojs/taro';
import './editInput.less';
import { useNavigationBar, useRouter } from 'taro-hooks';
import { Field, Button } from '@antmjs/vantui';
import { fetchModifyNickname } from '../../service/user/modifyNickname';
import { usePersistCallback } from '../../hooks/usePersistCallback';
import { showToast } from '../../utils';
import { usePiniaduxUserInfo } from '../../hooks/usePiniaduxUserInfo';

const TYPES = {
  nickname: {
    title: '修改昵称',
  },
};

export default function EditInput() {
  const [routerInfo] = useRouter();
  const { fieldName = 'nickname' } = routerInfo.params;
  useNavigationBar({
    title: TYPES[fieldName]?.title,
  });
  const { store } = usePiniaduxUserInfo();

  const [value, setValue] = useState('');

  const handleChange = usePersistCallback((event) => {
    setValue(event.detail);
    return;
  });

  const submit = usePersistCallback(async () => {
    if (value === '') {
      showToast('不能为空');
      return;
    }
    await fetchModifyNickname(value);
    store.nickname = value;

    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  });

  return (
    <>
      <Field
        value={value}
        placeholder="请输入昵称"
        label="昵称"
        required={true}
        onChange={handleChange}
      />
      <Button
        type="primary"
        size="large"
        color="green"
        round
        style={{
          marginTop: '100px',
        }}
        onClick={submit}
      >
        修改完成
      </Button>
    </>
  );
}
