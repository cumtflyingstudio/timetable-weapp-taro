import React, { Component, useCallback, useState } from 'react';
import Taro, { Config } from '@tarojs/taro';
import './editInput.less';
import { useNavigationBar, useRouter } from 'taro-hooks';
import { Field, Button, CellGroup } from '@antmjs/vantui';
import { usePersistCallback } from '../../hooks/usePersistCallback';
import { showToast } from '../../utils';
import { useGlobalUserInfo } from '../../hooks/useGlobalUserInfo';
import { fetchUpdateUserInfo } from '../../service/user/updateUserInfo';

const TYPES = {
  nickname: {
    title: '修改昵称',
    placeholder: '请输入昵称',
    label: '昵称',
    description: '其他用户可以看到你预约时所用的昵称',
  },
  phone: {
    title: '修改联系方式',
    placeholder: '请输入联系方式',
    label: '联系方式',
    description:
      '其他用户可以看到你预约时所用的联系方式，可填写 wx、qq、手机号',
  },
} as const;

export default function EditInput() {
  const [routerInfo] = useRouter();
  const { fieldName = 'nickname' } = routerInfo.params as {
    fieldName: keyof typeof TYPES;
  };

  const { title, label, placeholder, description } = TYPES[fieldName];

  useNavigationBar({
    title,
  });
  const { userInfo, setUserInfo } = useGlobalUserInfo();

  const [value, setValue] = useState(userInfo?.[fieldName] ?? '');

  const handleChange = usePersistCallback((event) => {
    setValue(event.detail);
    return;
  });

  const submit = usePersistCallback(async () => {
    if (value === '') {
      showToast('不能为空');
      return;
    }
    await fetchUpdateUserInfo({
      [fieldName]: value,
    });

    setUserInfo((draft) => {
      draft[fieldName] = value;
    });

    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  });

  return (
    <>
      <CellGroup title={description}>
        <Field
          value={value}
          placeholder={placeholder}
          label={label}
          required={true}
          onChange={handleChange}
        />
      </CellGroup>
      <Button
        type="primary"
        size="large"
        color="green"
        plain
        hairline
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
