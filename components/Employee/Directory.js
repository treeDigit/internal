import {
  Col,
  Row,
  Input,
  Form,
  Table,
  Typography,
  Popconfirm,
  Tooltip,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const originData = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    firstName: `Super ${i + 1}`,
    middleName: `Middle`,
    lastName: `User ${i + 1}`,
    itExp: `${i + 1} years`,
    jobLevel: `${i + 1} years`,
    empRole: `Role ${i + 1}`,
    orgEmail: `superuser${i + 1}@org.com`,
    reportingTo: `Manager ${i + 1}`,
    department: `Department`,
    mobileNo: `998293933${i}`,
    personalEmail: `superuser${i + 1}@gmail.com`,
    emergencyContact: `798798979${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Directory = ({ employees }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    const employeesData = employees.map((val) => {
      return {
        key: val.employee_id,
        firstName: val.first_name,
        middleName: "",
        lastName: val.last_name,
        itExp: "2 years",
        jobLevel: val.designation,
        empRole: `Role `,
        orgEmail: val.email,
        reportingTo: val.manager,
        department: `Department`,
        mobileNo: `998293933`,
        personalEmail: `superuser${1 + 1}@gmail.com`,
        emergencyContact: `798798979`,
        age: 32,
        address: val.location,
        assest:
          val.assest &&
          (val.assest.length == 0 ? (
            ""
          ) : val.assest.length == 1 ? (
            val.assest[0]
          ) : (
            <Tooltip
              placement="right"
              title={val.assest.map((permissionString, index) => (
                <div key={index}>
                  {index + 1}. {permissionString}
                </div>
              ))}
            >
              <span className="permission">{val.assest[0] + ", . . ."}</span>
            </Tooltip>
          )),
      };
    });
    setData(employeesData);
  }, []);
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      //   width: '25%',
      editable: true,
      fixed: "left",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      editable: true,
    },
    {
      title: "IT Exp",
      dataIndex: "itExp",
      editable: false,
    },
    {
      title: "Job Level",
      dataIndex: "jobLevel",
      editable: false,
    },
    {
      title: "Emp Role",
      dataIndex: "empRole",
      editable: false,
    },
    {
      title: "Org Email",
      dataIndex: "orgEmail",
      editable: true,
      width: "200px",
    },
    {
      title: "Reporting To",
      dataIndex: "reportingTo",
      editable: true,
    },
    {
      title: "Department",
      dataIndex: "department",
      editable: true,
    },
    {
      title: "Mobile No.",
      dataIndex: "mobileNo",
      editable: true,
    },
    {
      title: "Personal Email",
      dataIndex: "personalEmail",
      editable: true,
    },
    {
      title: "Emergency Contact",
      dataIndex: "emergencyContact",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      //   width: '15%',
      editable: false,
    },
    {
      title: "Address",
      dataIndex: "address",
      //   width: '40%',
      editable: true,
    },
    {
      title: "Assest",
      dataIndex: "assest",
      editable: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      editingKey: false,
      render: () => {
        return <span className="funded-status">Active</span>;
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              placement="leftTop"
              onConfirm={() => cancel()}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Row justify={"center"}>
      <Col span={23}>
        <div className="employee-body">
          <Row align={"end"}>
            <Col span={4}>
              <Input.Search
                // onSearch={onSearch}
                className="search-input"
                size="large"
                placeholder="Search..."
                allowClear
              />
            </Col>
          </Row>

          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              // bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: () => cancel(),
              }}
              scroll={{
                x: 2000,
                y: 500,
              }}
            />
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Directory;
