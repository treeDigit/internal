import {
  Col,
  Row,
  Input,
  Form,
  Table,
  Typography,
  Popconfirm,
  Button,
  Modal,
  message,
  DatePicker,
} from 'antd'
import { LeftOutlined, DownOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Router, useRouter } from 'next/router'
import Directory from '@/components/Employee/Directory'
import Reportees from '@/components/Employee/Reportees'
import clientPromise from '@/lib/mongoDb'
import { useSession, getSession } from 'next-auth/react'
import TreeLogo from '../public/Assests/Dashboard/logo.svg'

import axios from 'axios'
import Image from 'next/image'

const employee = ({ employees, session }) => {
  const router = useRouter()
  const { data } = useSession()
  const [activeTab, setActiveTab] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form] = Form.useForm()

  const onFinish = (values) => {
    if (values) {
      setIsModalOpen(false)
      axios.post('/api/employee', values).then((e) => console.log(e))
    }
  }

  const getReportees = () => {
    return employees.filter((val) => val.manager === session.user.employeeId)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div className='employee-container'>
      <div className='employee-header'>
        <Row justify={'space-between'} align={'middle'}>
          <Col span={12}>
            <Row>
              <h2>
                <LeftOutlined
                  onClick={() => router.back()}
                  className='cursor-pointer'
                />
                Employee
              </h2>
            </Row>
            <Row className='employee-tabs'>
              <Col span={12}>
                <Row>
                  <Col>
                    <h3
                      className={activeTab == 1 ? 'active-tab' : ''}
                      onClick={() => setActiveTab(1)}
                    >
                      MY RERORTEES
                    </h3>
                  </Col>
                  <Col>
                    <h3
                      className={activeTab == 2 ? 'active-tab' : ''}
                      onClick={() => setActiveTab(2)}
                    >
                      DIRECTORY
                    </h3>
                  </Col>
                </Row>
              </Col>
              <Col span={12} align={'end'}>
                {session.user.email === 'HR@treedigit.com' && (
                  <Button type='primary' onClick={showModal}>
                    Add Employee
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={12} align={'end'}>
            <Image src={TreeLogo} />
          </Col>
        </Row>
        <Modal
          title=<h3>Add Employee</h3>
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className='add-employee-modal'
          footer={null}
        >
          <div className='add-employee-form'>
            <Form
              layout='vertical'
              form={form}
              onFinish={onFinish}
              requiredMark={false}
            >
              <Row justify={'space-between'}>
                <Col span={11}>
                  <Form.Item
                    label='First Name'
                    name='first_name'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter First Name!',
                      },
                    ]}
                  >
                    <Input
                      rows={4}
                      placeholder='Enter First Name...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label='Last Name'
                    name='last_name'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Last Name!',
                      },
                    ]}
                  >
                    <Input
                      rows={4}
                      placeholder='Enter Last Name...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label='Date of Birth'
                name='dob'
                rules={[
                  {
                    required: true,
                    message: 'Please enter date of birth',
                  },
                ]}
                validateTrigger='onBlur'
              >
                <DatePicker
                  suffixIcon={<DownOutlined />}
                  size='large'
                  format={'MM/DD/YYYY'}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Personal Email'
                name='personal_email'
                // validateTrigger={'onBlur'}
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email address.',
                  },
                  {
                    required: true,
                    message: "Please enter employee's personal email address",
                  },
                ]}
              >
                <Input
                  size='large'
                  placeholder="Enter employee's personal email address..."
                ></Input>
              </Form.Item>

              <Form.Item
                label='Org Email'
                name='org_email'
                // validateTrigger={'onBlur'}
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email address.',
                  },
                  {
                    required: true,
                    message: 'Please enter org email address',
                  },
                ]}
              >
                <Input
                  size='large'
                  placeholder='Enter org email address...'
                ></Input>
              </Form.Item>

              <Form.Item
                label='Phone Number'
                name='mobile'
                rules={[
                  {
                    required: true,
                    message: 'Please enter phone number',
                  },
                ]}
              >
                <Input
                  allowEmptyFormatting
                  type='tel'
                  maxLength={10}
                  placeholder=' Enter phone number...'
                  className='phone-input'
                />
              </Form.Item>

              <Row justify={'space-between'}>
                <Col span={11}>
                  <Form.Item
                    label='IT Exp'
                    name='it_exp'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter IT Exp!',
                      },
                    ]}
                  >
                    <Input
                      rows={4}
                      placeholder='Enter IT Exp...'
                      size='large'
                    />
                  </Form.Item>
                </Col>

                <Col span={11}>
                  <Form.Item
                    label='Job Level'
                    name='job_level'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Job Level!',
                      },
                    ]}
                  >
                    <Input
                      rows={4}
                      placeholder='Enter Job Level...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={'space-between'}>
                <Col span={11}>
                  <Form.Item
                    label='Empoyee ID'
                    name='empoyee_id'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Empoyee ID!',
                      },
                    ]}
                  >
                    <Input
                      type='number'
                      rows={4}
                      placeholder='Enter Empoyee ID...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label='Reporting Manager'
                    name='reporting_manager'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Reporting Manager!',
                      },
                    ]}
                  >
                    <Input
                      rows={4}
                      placeholder='Enter Reporting Manager...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label='Empoyee Role'
                name='emp_Role'
                rules={[
                  {
                    required: true,
                    message: 'Please enter Empoyee Role!',
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder='Enter Empoyee Role...'
                  size='large'
                />
              </Form.Item>
              <Row justify={'space-between'}>
                <Col span={11}>
                  <Form.Item
                    label='Department'
                    name='department'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Department!',
                      },
                    ]}
                  >
                    <Input
                      rows={4}
                      placeholder='Enter Department...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label='Age'
                    name='age'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter age!',
                      },
                    ]}
                  >
                    <Input
                      type='number'
                      rows={4}
                      placeholder='Enter age...'
                      size='large'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label='Address'
                name='address'
                rules={[
                  {
                    required: true,
                    message: 'Please enter Address!',
                  },
                ]}
              >
                <Input rows={4} placeholder='Enter Address...' size='large' />
              </Form.Item>

              <Form.Item
                label='Location'
                name='location'
                rules={[
                  {
                    required: true,
                    message: 'Please enter Location!',
                  },
                ]}
              >
                <Input rows={4} placeholder='Enter Location...' size='large' />
              </Form.Item>

              <Row justify={'end'}>
                <Button onClick={handleCancel}>Cancel</Button>&nbsp;&nbsp;
                <Button type='primary' htmlType='submit'>
                  Add
                </Button>
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
      {activeTab == 1 ? (
        <div>
          <Reportees employees={getReportees()} />
        </div>
      ) : (
        <div>
          <Directory employees={employees} />
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({ req: context.req })

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
    const client = await clientPromise
    const db = client.db('employeeDashboard')

    const employees = await db.collection('employee').find({}).toArray()
    return {
      props: { employees: JSON.parse(JSON.stringify(employees)), session },
    }
  } catch (e) {
    console.error(e)
  }
}

export default employee
