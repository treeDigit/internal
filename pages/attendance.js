import { Button, Col, Row, Table, Tag, Space } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import TreeLogo from '../public/Assests/Dashboard/logo.svg'
import Image from 'next/image'

const Attendance = () => {
  const router = useRouter()

  const moment = require('moment')
  const currentMonth = moment()
  const daysInMonth = currentMonth.daysInMonth()
  const allDatesInMonth = []
  for (let day = 1; day <= daysInMonth; day++) {
    const date = currentMonth.date(day)
    let dateObject = {}
    if (day == 1) {
      dateObject = {
        date: date.format('DD/MM/YYYY'),
        status: 'Present',
        check_in: '10:00',
        check_out: '6:00',
        duration: '8 hrs',
      }
    } else {
      dateObject = {
        date: date.format('DD/MM/YYYY'),
        status: '-NA-',
        check_in: '-NA-',
        check_out: '-NA-',
        duration: '-NA-',
      }
    }
    allDatesInMonth.push(dateObject)
  }

  console.log(allDatesInMonth)

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Check In',
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: 'Check Out',
      key: 'check_out',
      dataIndex: 'check_out',
    },
    {
      title: 'Duration',
      key: 'duration',
      dataIndex: 'duration',
    },
  ]

  const data = allDatesInMonth.map((item, index) => ({
    date: item?.date,
    status: item?.status,
    check_in: item?.check_in,
    check_out: item?.check_out,
    duration: item?.duration,
  }))
  return (
    <div className='attendance-container'>
      <div className='attendance-header'>
        <Row className='header-row'>
          <Col span={12} className='left-col'>
            <p>
              <LeftOutlined
                onClick={() => router.back()}
                className='cursor-pointer'
              />
              Attendance
            </p>
          </Col>
          <Col span={12} align={'end'}>
            <Image src={TreeLogo} />
          </Col>
        </Row>
      </div>
      <div className='attendance-body'>
        <Row justify={'center'} gutter={[0, 20]}>
          <Col span={22}>
            <Row align={'middle'}>
              <Col span={12}>
                <h3>
                  Mark attendance for today({moment().format('DD MMMM, YYYY')})
                </h3>
              </Col>
              <Col span={12} align={'end'}>
                <Button type='primary'>Check In</Button>&nbsp;&nbsp;
                <Button>Check Out</Button>
              </Col>
            </Row>

            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Attendance
