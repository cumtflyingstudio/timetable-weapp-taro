import Applications from "./comps/Applications/index";

import "./index.less";
const hello = "hello";

export default () => {
  return (
    <>
      <Applications
        applicationList={new Array(6).fill({ name: hello, avatar: hello })}
      />
    </>
  );
};
