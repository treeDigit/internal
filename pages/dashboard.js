import { Col, Image, Row, Input } from 'antd'
import React from 'react'
import TreeLogo from '../public/Assests/Dashboard/logo.svg'
import Logout from '../public/Assests/Dashboard/Logout.svg'
import Claims from '../public/Assests/Dashboard/web-analysis.png'
import Employee from '../public/Assests/Dashboard/monitoring.png'
import Attendance from '../public/Assests/Dashboard/interface.png'
import Leaves from '../public/Assests/Dashboard/leaveImage.png'
import HR from '../public/Assests/Dashboard/responsive.png'
import Calender from '../public/Assests/Dashboard/calender.png'
import Performance from '../public/Assests/Dashboard/speedometer.png'
import Payment from '../public/Assests/Dashboard/Payment.png'
import { useRouter } from 'next/router'
const { Search } = Input
import { getSession } from 'next-auth/react'

const Dashboard = () => {
  const router = useRouter()

  const onSearch = (value, _e, info) => console.log(info?.source, value)

  const cardData = [
    {
      imgsrc: Claims.src,
      label: <h3 className='dashbord-nav'>Claims</h3>,
      routeLink: '/claim',
    },
    {
      imgsrc: Employee.src,
      label: <h3 className='dashbord-nav'>Employee</h3>,
      routeLink: '/employee',
    },
    {
      imgsrc: Attendance.src,
      label: <h3 className='dashbord-nav'>Attendance</h3>,
      routeLink: '/attendance',
    },
    {
      imgsrc: Performance.src,
      label: <h3 className='dashbord-nav'>Performance</h3>,
      routeLink: '/performance',
    },
    {
      imgsrc: Leaves.src,
      label: <h3 className='dashbord-nav'>Leaves</h3>,
      routeLink: '/leaves',
    },
    {
      imgsrc: HR.src,
      label: <h3 className='dashbord-nav'>HR</h3>,
      routeLink: '/dashboard',
    },
    // {
    //   imgsrc: Calender.src,
    //   label: <h3>Calender</h3>,
    //   routeLink: '/calender',
    // },

    // {
    //   imgsrc: Payment.src,
    //   label: <h3>Payment</h3>,
    //   routeLink: '/payslips',
    // },
  ]
  return (
    <div className='dashboard-container'>
      <Row justify={'space-between'} align={'middle'}>
        <Col span={12}>
          <Image src={TreeLogo.src} width={100} height={100} preview={false} />
        </Col>
        <Col span={12} align={'end'}>
          <Image
            src={Logout.src}
            width={40}
            height={40}
            preview={false}
            className='cursor-pointer'
          />
        </Col>
      </Row>
      <Row className='header-row' justify={'center'}>
        {/* <Col span={8}>
          <Image src={TreeLogo.src} width={100} height={100} preview={false} />
        </Col> */}
        <div className='top-header'>
          <h1>TREE HUB </h1>
          <h2>Dashboard</h2>
        </div>
      </Row>
      <Row justify={'center'} className='dashboard-body'>
        <Col span={20}>
          <Row gutter={[0, 40]} className='card-row'>
            {cardData.map((item, index) => (
              <Col
                span={8}
                align={'middle'}
                onClick={() => {
                  router.push(item.routeLink)
                }}
                className='cursor-pointer card-item'
              >
                <Image
                  src={item.imgsrc}
                  alt={item.label}
                  // className='logos-background'
                  className='dashboard-logos'
                  preview={false}
                  width={130}
                  height={130}
                />
                {item.label}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  console.log(session,process.env.NODE_ENV,process.env.NEXTAUTH_SECRET)
  
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: { session },
  }
}
export default Dashboard
