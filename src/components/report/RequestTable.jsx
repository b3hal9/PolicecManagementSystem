import moment from 'moment'

import styles from '../styles/record.module.css'
import { useEffect, useState } from 'react'
import apiClient from '../../utils/client'

function RequestTable() {
  const [request, setRequest] = useState([{}])
  let count = 0
  const loadData = async () => {
    const response = await apiClient.get('/allrequests')
    if (response.ok) {
      setRequest(response.data)
    } else {
      setRequest(null)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  console.table(request, 'fk')
  return (
    <>
      {request !== null && (
        <table className={styles.recordtable}>
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Time</th>
              <th>latitude</th>
              <th>longitude</th>
              {/* <th>View</th> */}
            </tr>
          </thead>
          {request.map((item) => (
            <tbody id={item.id}>
              <tr>
                <td>{(count += 1)}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{moment(item.updatedAt).format('YYYY-MM-DD, h:m A')}</td>
                <td>{item?.emergency_requests?.lat}</td>
                <td>{item?.emergency_requests?.lng}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  )
}

export default RequestTable
