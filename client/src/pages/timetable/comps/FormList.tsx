import { FC, navigateTo } from '@tarojs/taro';
import { Divider } from '@antmjs/vantui';
import type { IForm } from '../../../service/user/getMyForm';
import ShowCard from './ShowCard';

const FormList: FC<{ list: IForm[] }> = (props) => {
  const { list } = props;
  return (
    <div style={{ minHeight: '100vh', marginBottom: '50px' }}>
      {list.map((item) => {
        return (
          <div
            onClick={() => {
              navigateTo({
                url: `/pages/timetableDetail/timetableDetail?id=${item.id}`,
              });
            }}
            style={{ margin: 10 }}
            key={item.id as number}
          >
            <ShowCard item={item as IForm} />
          </div>
        );
      })}
      {list.length !== 0 ? (
        <Divider contentPosition="center">没有更多啦～</Divider>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FormList;
