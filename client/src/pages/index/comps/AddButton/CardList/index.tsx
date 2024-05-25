import { Divider, Empty, Skeleton } from '@antmjs/vantui';
import { FC } from '@tarojs/taro';
import { useRequest } from 'taro-hooks';
import findAllOrgan from '../../../../../service/organ/findAllOrgan';

import { withOutByKey } from '../../../../../utils';
import keywordSearch from '../../../../../utils/keywordSearch';
import { useListContext } from '../../../context';
import CardItem from './CardItem';

const LoadingAnimation = () => {
  return <Skeleton title={true} row={3} />;
};

interface ICardListProps {
  keyWord: string;
}

const CardList: FC<ICardListProps> = (props) => {
  const { data, error, loading } = useRequest(findAllOrgan, {
    throwOnError: true,
  });

  const { keyWord } = props;
  const { state } = useListContext();
  const filteredData = withOutByKey(
    data
      ?.map((item) => ({
        name: item.organizationName,
        _id: item.organizationId,
        avatar: item.avatar,
      }))
      ?.filter((item) => {
        return keywordSearch(item.name, keyWord);
      }) || [],
    state.applicationList_added,
    '_id',
  );

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>{filteredData?.length === 0 ? <Empty /> : null}</>
      )}
      {filteredData?.map((item) => {
        return <CardItem item={item} key={item._id} />;
      })}
      <Divider contentPosition="center">添加到屏幕后长按可删除</Divider>
    </>
  );
};

export default CardList;
