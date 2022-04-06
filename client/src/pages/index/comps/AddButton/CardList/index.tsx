import { Empty, Skeleton } from "@antmjs/vantui";
import { FC } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useRequest } from "taro-hooks";
import findAllOrgan from "../../../../../service/organ/findAllOrgan";

import { withOutByKey } from "../../../../../utils";
import { useListContext } from "../../../context";
import CardItem from "./CardItem";

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
        avatar: "",
      }))
      ?.filter((item) => {
        return (
          item.name.includes(keyWord) ||
          new RegExp(
            "(.*?)" + Array.from(keyWord).join("(.*?)") + "(.*?)"
          ).test(item.name)
        );
      }) || [],
    state.applicationList_added,
    "_id"
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
    </>
  );
};

export default CardList;
