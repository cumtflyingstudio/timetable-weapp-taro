import { DropdownItem, DropdownMenu, Sticky } from '@antmjs/vantui';
import { useCallback, useMemo, useState } from 'react';
import { getStatus } from './ShowCard';

const DropDownMenu = ({
  state,
  setState,
}: {
  state: { value1: any; option1: any; value2: any; option2: any };
  setState: any;
}) => {
  return (
    <Sticky>
      <DropdownMenu>
        <DropdownItem
          value={state.value1}
          options={state.option1}
          onChange={(value: string) => {
            setState({ ...state, value1: value });
          }}
        />
        <DropdownItem
          value={state.value2}
          options={state.option2}
          onChange={(value: number) => {
            setState({ ...state, value2: value });
          }}
        />
      </DropdownMenu>
    </Sticky>
  );
};

const useFilter = () => {
  const [state, setState] = useState({
    option1: [
      {
        text: '全部场地',
        value: '全部',
      },
      {
        text: '教室',
        value: '教室',
      },
      {
        text: '设备',
        value: '设备',
      },
    ],
    option2: [
      {
        text: '全部类型',
        value: -1,
      },
      {
        text: getStatus(0).name,
        value: 0,
      },
      {
        text: getStatus(1).name,
        value: 1,
      },
      {
        text: getStatus(2).name,
        value: 2,
      },
    ],
    option3: [
      {
        text: '未来',
        value: 0,
      },
      {
        text: '全部',
        value: 1,
      },
    ],
    value1: '全部',
    value2: -1,
    value3: 0,
  });
  return {
    state,
    setState,
    firstValue: state.value1,
    secondValue: state.value2,
  };
};

export default useFilter;
export { useFilter, DropDownMenu };
