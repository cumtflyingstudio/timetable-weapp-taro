import { FC } from "@tarojs/taro";
import { HStack, WhiteSpace } from "../../../../components/Stack";
import Application from "./Application";
import AddButton from "./AddButton";
const Applications: FC<IApplicationsProps> = props => {
  const { applicationList: list } = props;
  return (
    <>
      <WhiteSpace>
        <HStack style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>
          {list.map(item => {
            return <Application applicationItem={item} />;
          })}
          <AddButton />
        </HStack>
      </WhiteSpace>
    </>
  );
};
export default Applications;
