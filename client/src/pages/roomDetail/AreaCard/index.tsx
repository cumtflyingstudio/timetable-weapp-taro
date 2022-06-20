import { FC } from 'react';
import Slider from '../Slider';

const initialObj = {
  roomId: '',
  organizationId: null,
  roomName: '',
  leader: '',
  introduction: '',
  deleted: null,
  createTime: null,
};

const AreaCard: FC<{ area: Room }> = (props) => {
  const { area = initialObj } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        opacity: '1',
      }}
    >
      <Slider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            padding: '10px',
            background: '#4cc8b9',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
          }}
        >
          {area.roomName} - {area.leader}
        </div>
      </div>
    </div>
  );
};
export default AreaCard;
