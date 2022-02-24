import { useState, useEffect } from 'react'
import Footer from '../layout/common/footer/Footer'
import NexusNav from '../layout/common/navbar/NexusNav'
import styles from '../styles/record.module.css'
import RecordForm from './RecordForm'
import RecordTable from './recordTable'
import { toast, ToastContainer } from 'react-toastify'

const RecordPage = () => {
  const [showTable, setTable] = useState(true)
  const [showForm, setForm] = useState(false)
  const [search, setSearch] = useState('')

  const handleTable = (e) => {
    e.preventDefault()
    setTable(true)
    setForm(false)
  }
  const handleForm = () => {
    setTable(false)
    setForm(true)
  }

  return (
    <>
      <ToastContainer />
      <NexusNav />
      <div className={styles.record}>
        <div className={styles.topbar}>
          <h1>All Criminal Records</h1>
          <div className={styles.menu}>
            <button className={styles.btnPrimary} onClick={handleTable}>
              View Records
            </button>
            <button className={styles.btn} onClick={handleForm}>
              Add Records
            </button>
          </div>
          <div className={styles.searchsection}>
            <div className={styles.searchbox}>
              <input
                type="text"
                placeholder="search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
        {showForm ? <RecordForm /> : ''}
        {showTable ? <RecordTable toast={toast} search={search} /> : ''}
      </div>
      <Footer />
    </>
  )
}

export default RecordPage
