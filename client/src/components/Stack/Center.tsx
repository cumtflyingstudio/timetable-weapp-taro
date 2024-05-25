import { FC } from '@tarojs/taro';
import Stack from './Stack';

const Center: FC<IStackProp> = (props) => {
  const { style, ...otherProps } = props;
  return (
    <Stack
      {...otherProps}
      style={{
        ...style,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></Stack>
  );
};

export default Center;
