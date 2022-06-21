import { Cell, CellGroup, Tag, Collapse, CollapseItem } from '@antmjs/vantui';
import { useState } from 'react';
import { navigateTo } from '@tarojs/taro';

function AdminCellGroup() {
  const [values, setValues] = useState(['1']);
  return (
    <>
      <CellGroup title="管理区" inset>
        <Collapse value={values} onChange={(e) => setValues(e.detail)}>
          <Cell
            title="查看所有申请"
            isLink
            onClick={() => {
              navigateTo({
                url: '/pages/adminGetRequest/adminGetRequest',
              });
            }}
          />

          {/* <CollapseItem title="成员管理" name="1">
            <Cell
              title="查看所有成员"
              onClick={() => {
                console.log('hello');
              }}
            />
          </CollapseItem> */}
        </Collapse>
      </CellGroup>
    </>
  );
}
export default AdminCellGroup;
