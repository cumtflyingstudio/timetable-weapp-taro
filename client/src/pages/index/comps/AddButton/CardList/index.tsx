import { Empty, Skeleton } from "@antmjs/vantui";
import { FC } from "@tarojs/taro";
import { useRequest } from "taro-hooks";
import { getOrganizationList } from "../../../../../service";
import { withOutByKey } from "../../../../../utils";
import { useListContext } from "../../../context";
import CardItem from "./CardItem";

const LoadingAnimation = () => {
  return <Skeleton title={true} row={3} />;
};
interface ICardListProps {
  keyWord: string;
}
const CardList: FC<ICardListProps> = props => {
  const { data, error, loading } = useRequest(getOrganizationList);
  const { keyWord } = props;
  const { state } = useListContext();
  const filteredData = withOutByKey(
    data?.filter(item => {
      return (
        item.name.includes(keyWord) ||
        new RegExp("(.*?)" + Array.from(keyWord).join("(.*?)") + "(.*?)").test(
          item.name
        )
      );
    }) || [],
    state.applicationList_added,
    "name"
  );

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>{filteredData?.length === 0 ? <Empty /> : null}</>
      )}
      {filteredData?.map(item => {
        return <CardItem item={item} />;
      })}
    </>
  );
};

export default CardList;
