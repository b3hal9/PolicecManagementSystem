import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { handle_getReport } from '../../store/actions/recordAction'
import styles from '../styles/record.module.css'
import { toast, ToastContainer } from 'react-toastify'

function ReportTable() {
  const dispatch = useDispatch()
  const Crimes = useSelector((state) => state.record_data)

  useEffect(() => {
    dispatch(handle_getReport(toast))
    console.log(Crimes)
  }, [])
  let count = 0

  return (
    <>
      <ToastContainer />
      <>
        {Crimes.reports.length !== 0 ? (
          <table className={styles.recordtable}>
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Address</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>

            {Crimes.reports.map((report) => (
              <tbody>
                <tr>
                  <td data-label="Sn.">{(count += 1)}</td>
                  <td data-label="Name">{report.user.name}</td>
                  <td data-label="Email">{report.user.email}</td>
                  <td data-label="Date">{report.incidentDate}</td>
                  <td data-label="Time">{report.incidentTime}</td>
                  <td data-label="Address">{report.incidentAddress}</td>
                  <td data-label="Type">{report.reportType}</td>
                  <td data-label="Description">{report.description}</td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <div
            style={{
              marginTop: 20,
              textAlign: 'center',
              color: 'white',
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            No Report Found
          </div>
        )}
      </>
    </>
  )
}

export default ReportTable
