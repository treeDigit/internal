import React, { useState } from 'react'
import { useSession, getSession } from "next-auth/react";
import axios from "axios"
const { Column } = Table;
import clientPromise from "@/lib/mongoDb";
import {
  Col,
  Form,
  Image,
  Row,
  Radio,
  Input,
  message,
  Button,
  DatePicker,
  Select,
  Table,
  Space,
  Tooltip,
  Modal,
  Flex
} from 'antd'
import { LeftOutlined, DownOutlined, UploadOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import moment from 'moment'
import TreeLogo from '../public/Assests/Dashboard/logo.svg'

const claim = ({employee,myRequest, claimRequest}) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState(1)
  const [activeComponent, setActiveComponent] = useState('claims')
  const [value, setValue] = useState(0)
  const [claimReq,setClaimReq] = useState(claimRequest)
  
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleChangeClaims = (value) => {
    console.log(`selected ${value}`)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  const handleMonthChange = (value) => {
    console.log(`selected ${value}`)
  }

  const calculateTotal = (column) => {
    return data.reduce(
      (total, item) => total + parseFloat(item[column] || 0),
      0
    )
  }

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const showStatusModal = () => {
    setIsStatusModalOpen(true)
  }
  const handleStatusOk = () => {
    setIsStatusModalOpen(false)
  }
  const handleStatusCancel = () => {
    setIsStatusModalOpen(false)
  }
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const showClaimModal = () => {
    setIsClaimModalOpen(true)
  }
  const handleClaimOk = () => {
    setIsClaimModalOpen(false)
  }
  const handleClaimCancel = () => {
    setIsClaimModalOpen(false)
  }
  const columns = [
    {
      title: 'Particulars',
      dataIndex: 'particulars1',
    },
    {
      title: 'Current Period',
      dataIndex: 'current_period1',
    },
    {
      title: 'Year To Date',
      dataIndex: 'year_to_date1',
    },
    {
      title: 'Particulars',
      dataIndex: 'particulars2',
    },
    {
      title: 'Current Period',
      dataIndex: 'current_period2',
    },
    {
      title: 'Year To Date',
      dataIndex: 'year_to_date2',
    },
  ]

  const data = [
    {
      key: '1',
      particulars1: 'Basic Salary',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'PF Contribution',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
    {
      key: '2',
      particulars1: 'House Rent Allowance',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'VPF Contribution',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
    {
      key: '3',
      particulars1: 'Leave Travel Allowance',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'Professional Tax',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
    {
      key: '4',
      particulars1: 'Medical Allowance',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'Income Tax',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
    {
      key: '5',
      particulars1: 'Performance Bonus',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'TreeHub Welfare Trust',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
    {
      key: '6',
      particulars1: 'Misc. Earnings',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'Health Insurance Premium',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
    {
      key: '7',
      particulars1: 'Leave Encashment Service',
      current_period1: '100000',
      year_to_date1: '100000',
      particulars2: 'Well-begin Loan',
      current_period2: '0.0',
      year_to_date2: '0.0',
    },
  ]



  const totalRow = {
    key: 'total',
    particulars1: 'Total',
    current_period1: calculateTotal('current_period1').toFixed(2),
    year_to_date1: calculateTotal('year_to_date1').toFixed(2),
    particulars2: 'Total',
    current_period2: calculateTotal('current_period2').toFixed(2),
    year_to_date2: calculateTotal('year_to_date2').toFixed(2),
  }

  const final_data = [...data, totalRow]
  const handleApproveReject = (claimData,isApproved) =>{
    const reqBody={
        claimData,
        isApproved:isApproved,
    }
    axios.put("/api/claim",reqBody).then((res)=>{
        const data = claimReq.filter((val)=>val._id !== claimData._id)
        setClaimReq(data);
    })
  }

  const onFinishReimbursement = (values) => {
  const reqBody = {
      claimData:values,
      employeeId:employee.employee_id,
      employeeName:employee.first_name + " " + employee.last_name,
      employeeManager:employee.manager
  }

  axios.post("/api/claim",reqBody).then((res)=>message.success('Claim submitted successfully'))
  .catch((err)=>message.error('Claim submission failed'))
    form.resetFields()
  }

  return (
    <div className='claim-container'>
      <div>
        <div className='claim-header'>
          <Row className='header-row'>
            <Col span={12} className='left-col'>
              <p>
                <LeftOutlined
                  onClick={() => router.back()}
                  className='cursor-pointer'
                />
                Claims
              </p>
            </Col>
            <Col span={12} align={'end'}>
              <Image
                src={TreeLogo.src}
                width={100}
                height={100}
                preview={false}
              />
            </Col>
          </Row>
        </div>
        <div className='claim-body-new'>
          <Row className='expense-row'>
            <Col span={3}>
              <div
                className={
                  activeComponent === 'claims'
                    ? 'expense-left-col selected-value'
                    : 'expense-left-col un-selected-value'
                }
                onClick={() => setActiveComponent('claims')}
              >
                Expense Claims
              </div>
              <div
                className={
                  activeComponent === 'payslips'
                    ? 'expense-left-col selected-value'
                    : 'expense-left-col un-selected-value'
                }
                onClick={() => setActiveComponent('payslips')}
              >
                Payslips
              </div>
            </Col>
            <Col span={1}></Col>
            {activeComponent === 'claims' && activeTab == 1 && (
              <Col span={20} className='expense-right-col'>
                <h2 className='heading'>Expense Claim</h2>
                <hr />

                <p className='dropdown-claim-p'>
                  Please select a claim from below that is appropriate for the
                  claim
                </p>

                <Radio.Group onChange={onChange} value={value}>
                  <Space direction='vertical'>
                    <Tooltip
                      placement='rightTop'
                      overlayStyle={{ width: '800px' }}
                      title={
                        <div className='tooltip'>
                          <div className='tooltip-heading'>
                            You can claim for :
                          </div>
                          <div className='tooltip-body'>
                            <h4>Claims</h4>
                            <p>Foreign Travel Module</p>
                          </div>
                        </div>
                      }
                    >
                      <Radio
                        value={1}
                        className={
                          value === 1
                            ? 'expense-options selected-value'
                            : 'expense-options un-selected-value'
                        }
                      >
                        Budget Approve For Foregin Travel
                      </Radio>
                    </Tooltip>
                    <Tooltip
                      placement='rightTop'
                      overlayStyle={{ width: '800px' }}
                      title={
                        <div className='tooltip'>
                          <div className='tooltip-heading'>
                            You can claim for :
                          </div>
                          <div className='tooltip-body'>
                            <h4>Claims</h4>
                            <p>
                              Courier Changes (Laptops & IT office related).
                              Foreign Travel Module
                            </p>
                            <h4>Travel and Hotels</h4>

                            <p>
                              Flight/Train, Hotel, Local Transport, Per Dienm,
                              Visa fee
                            </p>

                            <h4>Food and Beverage</h4>
                            <p>Team Lunch/Dinner</p>
                            <h4>Subscriptions</h4>
                            <p>Software/SAAS tools</p>
                            <h4>Mobile and Internet</h4>
                            <p>
                              Internet and Mobile (Recommended limit is Rs
                              1000). Learning and Development. Program Workshop
                            </p>
                            <h4>Misc.</h4>
                            <p>Office Expense, Sports</p>
                          </div>
                        </div>
                      }
                    >
                      <Radio
                        value={2}
                        className={
                          value === 2
                            ? 'expense-options selected-value'
                            : 'expense-options un-selected-value'
                        }
                      >
                        Expense Claim
                      </Radio>
                    </Tooltip>
                  </Space>
                </Radio.Group>
                <div className='bottom-buttons'>
                  <Button
                    type='primary'
                    onClick={() => setActiveTab(2)}
                    disabled={value != 0 ? false : true}
                  >
                    Create Claim
                  </Button>
                  &nbsp;&nbsp;
                  <Button onClick={() => setValue(0)}> Cancel</Button>
                </div>
              </Col>
            )}

            {activeComponent === 'claims' && activeTab == 2 && (
              <Col span={20} className='expense-right-col'>
                <Row justify={'space-between'}>
                  <Col span={12}>
                    <h2 className='heading'>
                      Budget Approve For Foregin Travel
                    </h2>
                  </Col>
                  <Col span={12} align={'end'}>
                    <Button onClick={showClaimModal}>Claims Requests</Button>
                    &nbsp;&nbsp;
                    <Button type='primary' onClick={showStatusModal}>
                      Status
                    </Button>
                  </Col>
                </Row>
                <hr />

                <div className='claim-dates-row'>
                  <Row justify={'center'}>
                    <h2>Select Your Claim</h2>
                  </Row>
                </div>

                <div className='rows-background'>
                  <Row justify={'center'}>
                    <Form
                      layout='vertical'
                      form={form}
                      onFinish={onFinishReimbursement}
                      requiredMark={false}
                      className='reimbursement-form'
                    >
                      <Form.Item
                        label='Type of reimbursement?'
                        name='claim_type'
                        rules={[
                          {
                            required: true,
                            message: 'Please select type of Reimbursement',
                          },
                        ]}
                      >
                        <Select
                          placeholder='Please pick a type'
                          style={{
                            width: 400,
                          }}
                          onChange={handleChangeClaims}
                          options={[
                            {
                              label: 'Claims',
                              options: [
                                {
                                  label:
                                    'Courier Changes (Laptops & IT office related).',
                                  value: 'laptop_related.',
                                },
                                {
                                  label: 'Foreign Travel Module',
                                  value: 'foreign_travel_module',
                                },
                                {
                                  label: 'IT Expenses',
                                  value: 'it_expenses',
                                },
                                {
                                  label:
                                    'Learning and Development Certification',
                                  value: 'learning_development_certification',
                                },
                              ],
                            },
                            {
                              label: 'Travel and Hotels',
                              options: [
                                {
                                  label: 'Flight/Train',
                                  value: 'flight_train',
                                },
                                {
                                  label: 'Hotel',
                                  value: 'hotel',
                                },
                                {
                                  label: 'Local Transport',
                                  value: 'local_transport',
                                },
                                {
                                  label: 'Visa fee',
                                  value: 'visa_fee',
                                },
                              ],
                            },
                            {
                              label: 'Food and Beverage',
                              options: [
                                {
                                  label: 'Team Lunch/Dinner',
                                  value: 'lunch_dinner',
                                },
                              ],
                            },
                            {
                              label: 'Subsscriptions',
                              options: [
                                {
                                  label: 'Software/SAAS tools',
                                  value: 'softwavr_tool',
                                },
                              ],
                            },
                            {
                              label: 'Mobile and Internet',
                              options: [
                                {
                                  label:
                                    'Internet & Mobile (Recommended limit is Rs1000)',
                                  value: 'software_tool',
                                },
                                {
                                  label:
                                    'Learning and Development-Program/Workshop',
                                  value: 'learning_development',
                                },
                              ],
                            },
                            {
                              label: 'Misc.',
                              options: [
                                {
                                  label: 'Office Expense',
                                  value: 'office_expense',
                                },
                                {
                                  label: 'Sports/Hobbies',
                                  value: 'sports_hobbies',
                                },
                              ],
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Expense Date'
                        name='date'
                        rules={[
                          {
                            required: true,
                            message: 'Please select date',
                          },
                        ]}
                      >
                        <DatePicker
                          style={{
                            width: 400,
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label='Description'
                        name='description'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Description',
                          },
                        ]}
                      >
                        <Input.TextArea placeholder='Enter Description' />
                      </Form.Item>
                      <Form.Item
                        label='Amount'
                        name='amount'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Amount',
                          },
                        ]}
                      >
                        <Input placeholder='Enter Amount' />
                      </Form.Item>
                      <Form.Item
                        label='Supporting images or documents (maximum 5 MB each)'
                        name="doc_link"
                        rules={[
                          {
                            required: true,
                            message: 'Please upload the document',
                          },
                        ]}
                      >
                        <Input placeholder='Enter the link' />
                      </Form.Item>
                      <Row className='tab-two-button'>
                        <Button type='primary' htmlType='submit'>
                          Send for Approval
                        </Button>
                        &nbsp;&nbsp;
                        <Button onClick={() => setActiveTab(1)}>Cancel</Button>
                        &nbsp;&nbsp;
                      </Row>
                    </Form>
                  </Row>
                </div>

                {/* <Row>
                  <Col span={20}>
                    <h2 className='general'>General Remarks</h2>
                    <Input.TextArea></Input.TextArea>
                  </Col>
                </Row> */}
              </Col>
            )}

            {activeComponent === 'payslips' && (
              <Col span={20} className='expense-right-col'>
                <div className='payslip-body'>
                  <Row justify={'center'}>
                    <Col span={20}>
                      <Row align={'middle'} className='select-row'>
                        <Col span={12}>
                          <h2>Select financial year</h2>
                          <Select
                            style={{
                              width: 200,
                            }}
                            onChange={handleChange}
                            options={[
                              {
                                label: '2024 - 2025',
                                value: '2024_2025',
                              },
                              {
                                label: '2023 - 2024',
                                value: '2023_2024',
                              },

                              {
                                label: '2022 - 2023',
                                value: '2022_2023',
                              },
                            ]}
                            placeholder='Select Year'
                          />
                          &nbsp;&nbsp;
                          <Select
                            style={{
                              width: 200,
                            }}
                            onChange={handleMonthChange}
                            options={[
                              {
                                label: 'January',
                                value: 'January',
                              },
                              {
                                label: 'February',
                                value: 'February',
                              },

                              {
                                label: 'March',
                                value: 'March',
                              },
                              {
                                label: 'April',
                                value: 'April',
                              },
                              {
                                label: 'May',
                                value: 'May',
                              },
                              {
                                label: 'June',
                                value: 'June',
                              },
                              {
                                label: 'July',
                                value: 'July',
                              },
                              {
                                label: 'August',
                                value: 'August',
                              },
                              {
                                label: 'September',
                                value: 'September',
                              },
                              {
                                label: 'October',
                                value: 'October',
                              },
                              {
                                label: 'November',
                                value: 'November',
                              },
                              {
                                label: 'December',
                                value: 'December',
                              },
                            ]}
                            placeholder='Select Month'
                          />
                        </Col>
                        <Col span={12} align='end'>
                          <Button type='primary'>Download Payslips</Button>
                        </Col>
                      </Row>
                      <Table
                        columns={columns}
                        dataSource={final_data}
                        pagination={false}
                        scroll={{
                          y: '60vh',
                        }}
                        className='payslip-table'
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Modal
        title=<h2>Claim Status</h2>
        open={isStatusModalOpen}
        onOk={handleStatusOk}
        onCancel={handleStatusCancel}
        footer={null}
        width={1000}
        className='reimbursement-status'
      >
        <Table
          dataSource={myRequest}
          pagination={false}
          scroll={{
            y: '60vh',
          }}
        >
          <Column
            title="Date"
            dataIndex="date"
            key="date"
            render={(_, record) => <div>{record.date.split("T")[0]}</div>}
          />
          <Column
            title="Type"
            dataIndex="type"
            key="type"
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Description" dataIndex="description" key="description" />
          <Column title="Amount" dataIndex="amount" key="amount" />
          <Column title="Document"
          render={(_, record) => <a href={record.doc_link}>Link</a>}
          />
          <Column
            title="status"
            dataIndex="type"
            key="type"
            render={(_, record) => (
              <div>
                {!record.isActive
                  ? (record.isApproved_hr ?  <div className='funded-status leave-status'>APPROVED</div> : <div className='expired-status leave-status'>REJECTED</div>)
                  : <div className='pending-status leave-status'>PENDING</div>}
              </div>
            )}
          />
        </Table>
      </Modal>

      <Modal
        title=<h2>Claim Requests</h2>
        open={isClaimModalOpen}
        onOk={handleClaimOk}
        onCancel={handleClaimCancel}
        footer={null}
        width={1100}
        className='reimbursement-status'
      >
        <Table
          dataSource={claimReq}
          pagination={false}
          scroll={{
            y: '60vh',
          }}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="Date"
            dataIndex="date"
            key="date"
            render={(_, record) => <div>{record.date.split("T")[0]}</div>}
          />
          <Column
            title="Amount"
            dataIndex="amount"
            key="amount"
           
          />
           <Column
            title="Document"
            dataIndex="doc_link"
            key="doc_link"
            render={(_, record) => <a href={record.doc_link}>Link</a>}
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
    </div>
  )
}
export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const client = await clientPromise;
    const db = client.db("employeeDashboard");
    const employee = await db
      .collection("employee")
      .find({ employee_id: session.user.employeeId })
      .toArray();

    const claimRequest = await db
      .collection("claim_request")
      .find({
        $and: [{ currently_with: session.user.employeeId }, { isActive: true }],
      })
      .toArray();
    const myRequest = await db
      .collection("claim_request")
      .find({ employee_id: session.user.employeeId })
      .toArray();

    return {
      props: {
        employee: JSON.parse(JSON.stringify(employee[0])),
        claimRequest: JSON.parse(JSON.stringify(claimRequest)),
        myRequest: JSON.parse(JSON.stringify(myRequest)),
      },
    };
  } catch (e) {
    console.error(e);
  }
}

export default claim
