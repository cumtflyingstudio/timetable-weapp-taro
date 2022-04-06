import { Button, Image } from "@antmjs/vantui";
import { FC } from "@tarojs/taro";
import { context } from "../../../context";
import ShadowCard from "../../../../../components/ShadowCard";
import { HStack, VStack } from "../../../../../components/Stack";
import { hideContext } from "../Context/hideContext";

interface ICardItemProps {
  item: Application;
}

const CardItem: FC<ICardItemProps> = (props) => {
  const { item } = props;
  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        paddingTop: 0,
        paddingBottom: 20,
        overflow: "visible",
      }}
    >
      <ShadowCard>
        <HStack
          style={{
            justifyContent: "flex-start",
            padding: "0 20px 0 20px",
          }}
        >
          <Image
            style={{
              backgroundColor: "pink",
              width: "150rpx",
              height: "150rpx",
              borderRadius: 10,
            }}
            src={item.avatar}
          />

          <VStack style={{ width: "auto", flex: 1 }}>
            <div>{item.name}</div>
            <div>{item._id}</div>
          </VStack>
          <context.Consumer>
            {({ dispatch }) => (
              <hideContext.Consumer>
                {(hide) => (
                  <Button
                    onClick={() => {
                      dispatch({ type: "addApplication", payload: [item] });
                      hide();
                    }}
                  >
                    添加
                  </Button>
                )}
              </hideContext.Consumer>
            )}
          </context.Consumer>
        </HStack>
      </ShadowCard>
    </div>
  );
};

export default CardItem;
