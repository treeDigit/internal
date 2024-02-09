import { Button, Col, Row, Collapse, Image, Checkbox } from "antd";
import React from "react";
import {
  ScheduleFilled,
  DownOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import BlueBackground from "../../public/Assests/Overview/blue-background-image.png";
import WhiteBackground from "../../public/Assests/Overview/WhiteBackground.jpg";

const MySummary = () => {
  const options = [
    {
      label: "Question 1",
      value: "Question_1",
    },
    {
      label: "Question 2",
      value: "Question_2",
    },
    {
      label: "Question 3",
      value: "Question_3",
    },
  ];
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const CheckboxGroup = (year) => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return (
      <div>
        <Checkbox.Group
          options={options}
          defaultValue={["Pear"]}
          onChange={onChange}
          className="feedback-dropdown"
          disabled={currentYear == year ? false : true}
        />

        <Row justify={"end"}>
          <Button type="primary" disabled={currentYear == year ? false : true}>
            Submit
          </Button>
        </Row>
      </div>
    );
  };
  const getItems = [
    {
      key: "5",
      label: (
        <div>
          <h3>Mohit's (2024) feedback is pending for completion</h3>
          <p>a day ago | Additional Feedback</p>
        </div>
      ),
      children: <div>{CheckboxGroup(2024)}</div>,
    },
    {
      key: "1",
      label: (
        <div>
          <h3>Mohit's (2023) feedback is pending for completion</h3>
          <p>a day ago | Additional Feedback</p>
        </div>
      ),
      children: <div>{CheckboxGroup(2023)}</div>,
    },
    {
      key: "2",
      label: (
        <div>
          <h3>Mohit's (2022) feedback is pending for completion</h3>
          <p>a day ago | Additional Feedback</p>
        </div>
      ),
      children: <div>{CheckboxGroup(2022)}</div>,
    },
    {
      key: "3",
      label: (
        <div>
          <h3>Mohit's (2021) feedback is pending for completion</h3>
          <div>a day ago | Additional Feedback</div>
        </div>
      ),
      children: <div>{CheckboxGroup(2021)}</div>,
    },
    {
      key: "4",
      label: (
        <div>
          <h3>Mohit's (2020) feedback is pending for completion</h3>
          <div>a day ago | Additional Feedback</div>
        </div>
      ),
      children: <div>{CheckboxGroup(2020)}</div>,
    },
  ];
  return (
    <div>
      <Row justify={"center"}>
        <Col span={23}>
          <div className="my-summary-body">
            <Row justify={"space-between"}>
              <Col span={15} className="left-card">
                <Row justify={"space-between"} align={"middle"}>
                  <Col span={5} className="open-tasks">
                    <ScheduleFilled className="tick-icon" />
                    <h2> Open Tasks</h2>
                  </Col>
                </Row>

                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={getItems}
                />
              </Col>
              <Col span={8} align={"end"}>
                <Image
                  src={BlueBackground.src}
                  preview={false}
                  width={600}
                  height={600}
                />
                <br />
                <br />

                <Image
                  src={WhiteBackground.src}
                  preview={false}
                  width={600}
                  height={600}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MySummary;
