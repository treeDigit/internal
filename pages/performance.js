import { Col, Row, Input, Form, Table, Typography, Popconfirm } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Router, useRouter } from 'next/router'
// import MySummary from '@/components/Performance/MySummary'
//import MyReportee from '@/components/Performance/MyReportee'
//import Appraisal from '@/components/Performance/Appraisal'
import TreeLogo from '../public/Assests/Dashboard/logo.svg'
import Image from 'next/image'

const Performance = () => {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState(1)
  return (
    <div className='overview-container'>
      <div className='overview-header'>
        <Row>
          <Col span={12}>
            <Row>
              <Col>
                <h2>
                  <LeftOutlined
                    onClick={() => router.back()}
                    className='cursor-pointer'
                  />
                  Performance
                </h2>
              </Col>
            </Row>
            <Row className='overview-tabs'>
              <Col>
                <h3
                  className={activeTab == 1 ? 'active-tab' : ''}
                  onClick={() => setActiveTab(1)}
                >
                  Appraisal
                </h3>
              </Col>
              {/* <Col>
            <h3
              className={activeTab == 2 ? "active-tab" : ""}
              onClick={() => setActiveTab(2)}
            >
              MY SUMMARY
            </h3>
          </Col> */}
              <Col>
                <h3
                  className={activeTab == 3 ? 'active-tab' : ''}
                  onClick={() => setActiveTab(3)}
                >
                  MY REPORTEE
                </h3>
              </Col>
            </Row>
          </Col>
          <Col span={12} align={'end'}>
            <Image src={TreeLogo} />
          </Col>
        </Row>
      </div>

      {activeTab == 1 && (
        <div>
         
        </div>
      )}
      {/* {activeTab == 2 && (
        <div>
          <MySummary />
        </div>
      )} */}
      {activeTab == 3 && (
        <div>
        </div>
      )}
    </div>
  )
}

export default Performance
