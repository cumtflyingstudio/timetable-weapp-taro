import React from 'react';
import { OpenData } from '@tarojs/components';
import { FC } from '@tarojs/taro';
import { Image } from '@antmjs/vantui';
import { useAvatar } from './useAvatar';

interface IAvatarProps {
  /**
   * @description rpx
   */
  size: number;
}
const Avatar: FC<IAvatarProps> = (props) => {
  const { size = 200 } = props;
  const { store } = useAvatar();
  return (
    <div
      style={{
        width: `${size}rpx`,
        height: `${size}rpx`,
        borderRadius: 2000,
        overflow: 'hidden',
      }}
    >
      {store.avatarUrl ? (
        <Image
          src={store.avatarUrl}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <OpenData type="userAvatarUrl" />
      )}
    </div>
  );
};
export default Avatar;
