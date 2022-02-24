import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../layout/common/footer/Footer'
import NexusNav from '../layout/common/navbar/NexusNav'
import styles from '../styles/record.module.css'
import ReportTable from './ReportTable'
import RequestTable from './RequestTable'

const ReportPage = () => {
  const [reportTable, setReporttable] = useState(true)
  const [requestTable, setRequesttable] = useState(false)

  const handleTable = (e) => {
    e.preventDefault()
    setReporttable(true)
    setRequesttable(false)
  }
  const handleForm = () => {
    setReporttable(false)
    setRequesttable(true)
  }

  return (
    <>
      <NexusNav />
      <div className={styles.record}>
        <div className={styles.topbar}>
          <h1>All Messages</h1>
          <div className={styles.menu}>
            <button className={styles.btnPrimary} onClick={handleForm}>
              Requests
            </button>
            <button className={styles.btn} onClick={handleTable}>
              Reports
            </button>
          </div>
        </div>
        {reportTable ? <ReportTable /> : ''}
        {requestTable ? <RequestTable /> : ''}
      </div>
      <Footer />
    </>
  )
}

export default ReportPage
