import { Col, Row, Button } from 'antd'
import React, { useState } from 'react'
import {
  LeftOutlined,
  CheckCircleFilled,
  DashboardFilled,
  PieChartFilled,
  CloudDownloadOutlined,
} from '@ant-design/icons'

import { Router, useRouter } from 'next/router'
import AppraisalSummary from './AppraisalSummary'
import MyEditor from '../MyEditor/MyEditor'

const appraisal = () => {
  const router = useRouter()
  const [editorData, setEditorData] = useState('')
  return (
    <div className='appraisal-container'>
      {/* <div className="appraisal-header">
        <Row>
          <Col>
            <h2>
              <LeftOutlined
                onClick={() => router.back()}
                className="cursor-pointer"
              />
              Performance Cycle
            </h2>
          </Col>
        </Row>
      </div> */}
      <div className='center-card'>
        <Row justify={'center'}>
          <Col span={15} className='top-navigation'>
            <Row justify={'space-between'} align={'middle'}>
              <Col span={4} className='navigation-col-1'>
                {' '}
                <CheckCircleFilled
                  style={{
                    fontSize: '32px',
                    color: 'green',
                  }}
                />
                <h4> Employee Self</h4>
              </Col>
              <Col span={6}>
                <hr />
              </Col>
              <Col span={4} className='navigation-col-2' align='center'>
                <DashboardFilled
                  style={{
                    fontSize: '32px',
                    color: 'blue',
                  }}
                />
                <h4>Mentor</h4>
              </Col>
              <Col span={6}>
                <hr />
              </Col>
              <Col span={4} className='navigation-col-3' align='end'>
                <PieChartFilled
                  style={{
                    fontSize: '32px',
                    color: 'gray',
                  }}
                />
                <h4>HR Team</h4>
              </Col>
            </Row>
            <Row justify={'space-between'}>
              <Col span={7}>
                <p>Completed | 02-12-2023</p>
                <p>Rahul Sharma (4002)</p>
              </Col>
              <Col span={7} align='center'>
                <p>IN PROGRESS</p>
                <p>Rohit Sharma</p>
              </Col>
              <Col span={7} align='end'>
                <p>IN PROGRESS</p>
                <p>Rajat Sharma</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Row justify={'center'}>
        <Col span={23} className='self-review'>
          <CheckCircleFilled
            style={{
              fontSize: '32px',
              color: '#ffffff',
              background: 'black',
              borderRadius: '50%',
            }}
          />
          <div>
            <h3>Employee self Review is Submitted</h3>
            <p>Mentor step is currently in progress</p>
          </div>
        </Col>
      </Row>

      <Row justify={'center'}>
        <Col span={23}>
          <Row justify={'space-between'} align={'middle'}>
            <Col span={5}>
              <h2>Appraisal Summary</h2>
            </Col>
            <Col span={5} align={'end'}>
              <CloudDownloadOutlined
                style={{
                  color: 'blue',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              />
            </Col>
          </Row>

          <div className='inner-section'>
            <h3>Forms</h3>

            <div className='text-editor-container'>
              <div className='text-editor-white-container'>
                <div className='text-editor-blue-container'>
                  <span className='employee-self-review'>
                    EMPLOYEE SELF REVIEW
                  </span>

                  <p>What did you do well</p>
                  <MyEditor />

                  <p>What coluld you have done better</p>
                  <MyEditor />

                  <p>How your leads/company could have helped you better</p>
                  <MyEditor />

                  <p>Anything specific you'd like to do over the next year</p>
                  <MyEditor />
                </div>
                <Button
                  type='primary'
                  style={{
                    margin: '20px 0',
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className='inner-section'>
            <h3>Competencies - 14</h3>

            <div className='dropdowns-container'>
              <AppraisalSummary
                mainheading={'Communication - Written'}
                review={'Good in Written'}
              />
              <AppraisalSummary
                mainheading={'Communication - Spoken'}
                review={'Good in Spoken'}
              />
              <AppraisalSummary
                mainheading={'Professionalism - Teamwork'}
                review={'Nice  teamwork'}
              />
              <AppraisalSummary
                mainheading={'Technology Understanding'}
                review={'Need to improve'}
              />
              <AppraisalSummary
                mainheading={'Architecture & Design'}
                review={'Good in Architecture & Design'}
              />
              <AppraisalSummary
                mainheading={'Development & DevOps'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Software Testing & Quality'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Problem Discovery & Defination'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Story Telling & Presentation'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Value Measurement & Articulation'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Project Management'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Agile Methodology'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Client Management'}
                review={'any xyz comment'}
              />
              <AppraisalSummary
                mainheading={'Team Management'}
                review={'any xyz comment'}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default appraisal
