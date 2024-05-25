import { FC } from 'react';
import AnimateView from './AnimateView';

interface ITouchableOpacity {
  toOpacity?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLongPress?: () => void;
}

const TouchableOpacity: FC<ITouchableOpacity> = (props) => {
  const { toOpacity } = props;
  return <AnimateView activeStyle={{ opacity: toOpacity ?? 0.3 }} {...props} />;
};
export default TouchableOpacity;
