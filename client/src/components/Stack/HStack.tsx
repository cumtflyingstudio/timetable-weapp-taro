import { FC } from '@tarojs/taro';
import Stack from './Stack';

const HStack: FC<IStackProp> = (props) => {
  const { style, ...otherProps } = props;
  return (
    <Stack {...otherProps} style={{ ...style, flexDirection: 'row' }}></Stack>
  );
};

export default HStack;
