import {Table} from "antd";

function Restaurants() {
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
}

export default Restaurants;