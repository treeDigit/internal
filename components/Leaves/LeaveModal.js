import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Table } from "antd";
const {Column}  = Table
const LeaveModal = ({ holidays, modelOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(modelOpen);
  const handleOk = () => {
    
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    onClose();
    setIsModalOpen(false);
  };
  useEffect(()=>{
    setIsModalOpen(modelOpen)
  },[modelOpen])
  return (
    <>
     
      <Modal
        title="Holiday List"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={false}
        footer={null}
      >
        <Table dataSource={holidays} pagination={false}>
          <Column title="Date" dataIndex="date" key="date" />
          <Column title="Description" dataIndex="description" key="description" />
        </Table>
      </Modal>
    </>
  );
};
export default LeaveModal;
