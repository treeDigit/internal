import React, { useEffect, useState } from "react";
import { Button, Modal, Flex } from "antd";
import { Table } from "antd";
import axios from "axios";
const { Column } = Table;
const ApproveLeaveModal = ({setLeaveReq, leaveList, modelOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(modelOpen);
  const handleOk = () => {
    
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    onClose();
    setIsModalOpen(false);
  };
  const handleApproveReject = (leaveData,isApproved) =>{
    const reqBody={
        leaveData,
        isApproved:isApproved,
    }
    axios.put("/api/leaves",reqBody).then((res)=>{
        const data = leaveList.filter((val)=>val._id !== leaveData._id)
        setLeaveReq(data);
    })
  }
  useEffect(() => {
    setIsModalOpen(modelOpen);
  }, [modelOpen]);
  return (
    <>
      <Modal
        title="Holiday List"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={false}
        footer={null}
        width={"auto"}
      >
        <Table dataSource={leaveList} pagination={false}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="From Date"
            dataIndex="from_date"
            key="from_date"
            render={(_, record) => <div>{record.from_date.split("T")[0]}</div>}
          />
          <Column
            title="To Date"
            dataIndex="to_date"
            key="to_date"
            render={(_, record) => <div>{record.to_date.split("T")[0]}</div>}
          />
          <Column
            title="Action"
            dataIndex="action"
            key="action"
            render={(_, record) => (
              <Flex gap="small" wrap="wrap">
                <Button type="primary" onClick={()=>handleApproveReject(record,true)}>
                  Approve
                </Button>
                <Button type="primary" danger onClick={()=>handleApproveReject(record,false)}>
                  Reject
                </Button>
              </Flex>
            )}
          />
        </Table>
      </Modal>
    </>
  );
};
export default ApproveLeaveModal;
