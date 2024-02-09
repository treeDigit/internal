import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, DatePicker, Input, Select } from "antd";
import {getDatesBetween} from "@/utils/dates"
import axios from "axios"

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const ApplyLeave = ({employee, modelOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(modelOpen);
  const [type,setType] = useState("paid");
  const descRef = useRef();
  const [date, setDate] = useState([]);

  const handleApply = () => {
    const dates = getDatesBetween(date[0],date[1]);
    const leaveData = {
        from_date:date[0],
        to_date:date[1],
        isApproved:false,
        type:type,
        total_days:dates.length,
        description:descRef.current.resizableTextArea.textArea.value
    }
    const reqBody = {
        leaveData,
        employeeId:employee.employee_id,
        employeeName:employee.first_name + " " + employee.last_name,
        employeeManager:employee.manager
    }
    setIsModalOpen(false);
    axios.post("/api/leaves",reqBody).then((res)=>console.log(res))
    onClose()
  };
  const onCancel = () => {
    onClose();
    setIsModalOpen(false);
  };
  useEffect(() => {
    setIsModalOpen(modelOpen);
  }, [modelOpen]);

  const items = [
    {
      key: 1,
      label: "Paid",
    },
  ];

  return (
    <Modal
      title="Apply Leave"
      open={isModalOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="apply"
          type="primary"
          loading={false}
          onClick={handleApply}
        >
          Apply
        </Button>,
      ]}
    >
      <Form>
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Please select the start date" }]}
        >
          <RangePicker onCalendarChange={(e) => setDate(e)} />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type of Leave"
          rules={[{ required: true, message: "Please select the type" }]}
        >
          <Select
            defaultValue="paid"
            style={{ width: 120 }}
            onChange={(e)=>setType(e)}
            options={[
              { value: "paid", label: "Paid" },
              { value: "unpaid", label: "UnPaid" }
            ]}
          />
        </Form.Item>
        <Form.Item
          name="note"
          label="Note for the manager"
          rules={[{ required: true, message: "Please fill the reason" }]}
        >
          <TextArea rows={3} ref={descRef}  />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplyLeave;
