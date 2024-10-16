import { observer } from "mobx-react-lite";
import {Table} from "antd";

const Products = observer(function Products() {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        }
    ]
    return (
        <div>
            <Table
                columns={columns}
                dataSource={[]}
                size="large"
                pagination={false}
                loading={false}
                scroll={{ x: 1000, y: 500 }}
            />
        </div>
    );
});

export default Products;
