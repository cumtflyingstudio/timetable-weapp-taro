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
    description: '其他用户可以看到你预约时所用的昵称，可填写具有辨识性的昵称',
  },
  introduction: {
    title: '修改个人简介',
    placeholder: '请输入个人简介',
    label: '个人简介',
    description:
      '其他用户会在预约中看到你的个人简介，需要填写有具有辨识性的内容，如所在的部门、职务等，以供其他用户查看',
  },
  phone: {
    title: '修改通信方式',
    placeholder: '请输入通信方式',
    label: '通信方式',
    description:
      '其他用户可以看到你预约时所用的通信方式，可自由填写，其他用户可以通过该方式通知到预约者',
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

    if (value.length > 510) {
      showToast('内容过长');
      return;
    }
    await fetchUpdateUserInfo({
      [fieldName]: value,
    });

    showToast('修改成功');

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
