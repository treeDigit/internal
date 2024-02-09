import employee from '@/pages/employee'
import { Col, Row, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const Reportees = ({employees}) => {
  const [selectionType, setSelectionType] = useState('checkbox')
  const columns = [
    {
      title: '',
      dataIndex: '',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Shifts',
      dataIndex: 'shifts',
    },
    {
      title: 'Custom Office Location',
      dataIndex: 'office_location',
    },
  ]

  const data = []
  employees.forEach((val)=>{
    data.push({
      key: val.employee_id,
      name: val.first_name + " " + val.last_name,
      id:  val.employee_id,
      designation: val.designation,
      email: val.email,
      shifts: `Shift 1`,
      office_location: `Office Location ${val.location}`,
    })
  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }
  return (
    <div>
      <Row justify={'center'}>
        <Col span={23}>
          <div className='reporteer-body'>
            <Row justify={'space-between'}>
              <Col span={6}>
                <p className='active-employee'>7 Active Employee</p>
              </Col>
              <Col span={4}>
                <Input.Search
                  // onSearch={onSearch}
                  className='search-input'
                  size='large'
                  placeholder='Search...'
                  allowClear
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Table
                  rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Reportees
