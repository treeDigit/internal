import React, { useState } from 'react'
import { Button, Col, Row, Collapse, Image, Checkbox, Input, Table } from 'antd'
import { ProfileFilled, DownOutlined } from '@ant-design/icons'
import MyEditor from '../MyEditor/MyEditor'

const MyReporteeSummary = ({ reporteeName }) => {
  const getItems = [
    {
      key: `${reporteeName}'s review`,
      label: (
        <div>
          <Row>
            <Col span={24}>
              <p
                style={{
                  margin: 0,
                  fontSize: '30px',
                  fontWeight: '700',
                }}
              >
                {`${reporteeName}'s review`}
              </p>
            </Col>
          </Row>
        </div>
      ),
      children: (
        <div className='open-collapse'>
          <Row align={'middle'} className='open-collapse-row'>
            <Col span={24}>
              <h1 className='review-heading'>Self Review</h1>
              <hr />
              <h3>What did you do well</h3>
              <p>reason 1</p>
              <h3>What coluld you have done better</h3>
              <p>reason 2</p>
              <h3>How your leads/company could have helped you better</h3>
              <p>reason 3</p>
              <h3>Anything specific you'd like to do over the next year</h3>
              <p>reason 4</p>

              <h1 className='review-heading'>Mentor Review</h1>
              <hr />
              <h3>Communication - Written</h3>
              <MyEditor />

              <h3>Communication - Spoken</h3>
              <MyEditor />
              <h3>Professionalism - Teamwork</h3>
              <MyEditor />
              <h3>Technology Understanding</h3>
              <MyEditor />
              <h3>Architecture & Design</h3>
              <MyEditor />
              <h3>Development & DevOps</h3>
              <MyEditor />
              <h3>Software Testing & Quality</h3>
              <MyEditor />
              <h3>Problem Discovery & Defination</h3>
              <MyEditor />
              <h3>Software Testing & Quality</h3>
              <MyEditor />
              <h3>Problem Discovery & Defination</h3>
              <MyEditor />
              <h3>Problem Discovery & Defination</h3>
              <MyEditor />
              <h3>Story Telling & Presentation</h3>
              <MyEditor />
              <h3>Value Measurement & Articulation</h3>
              <MyEditor />
              <h3>Project Management</h3>
              <MyEditor />
              <h3>Agile Methodology</h3>
              <MyEditor />
              <h3>Client Management</h3>
              <MyEditor />
              <h3>Team Management</h3>
              <MyEditor />

              <Button
                type='primary'
                style={{
                  margin: '20px 0',
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </div>
      ),
    },
  ]
  return (
    <div>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined
            rotate={isActive ? 180 : 0}
            style={{
              fontSize: '20px',
              cursor: 'pointer',
            }}
          />
        )}
        items={getItems}
      />
    </div>
  )
}

export default MyReporteeSummary
