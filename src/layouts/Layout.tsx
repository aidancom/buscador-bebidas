import { Outlet } from 'react-router'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Notification from '../components/Notification'


const Layout = () => {

  return (
    <>
      <Header/>
      <main className='container mx-auto py-16'>
        <Outlet/>
      </main>
      <Modal/>
      <Notification />
    </>
  )
}

export default Layout
