import { FC } from '@tarojs/taro';

interface IWhiteSpaceProps {
  size?: number;
}
const WhiteSpace: FC<IWhiteSpaceProps> = (props) => {
  const { size } = props;
  return (
    <div
      style={{
        marginLeft: size ?? 50,
        marginRight: size ?? 50,
      }}
    >
      {props.children}
    </div>
  );
};
export default WhiteSpace;
