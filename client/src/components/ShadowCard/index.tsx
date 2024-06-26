import { FC } from '@tarojs/taro';
import React from 'react';

const ShadowCard: FC = (props) => {
  return (
    <div className="shadow" style={{ width: '100%', height: 'auto' }}>
      {props.children}
    </div>
  );
};

export default ShadowCard;
