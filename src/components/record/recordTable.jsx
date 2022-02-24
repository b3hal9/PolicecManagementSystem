import { useNavigate } from 'react-router-dom'
import styles from '../styles/record.module.css'
import { useDispatch } from 'react-redux'
import { handle_getAllRecord } from '../../store/actions/recordAction'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function RecordTable({ toast, search }) {
  console.log(search)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let count = 0
  const { loading, records } = useSelector((state) => state.record_data)
  console.log(records)
  useEffect(() => {
    dispatch(handle_getAllRecord(toast))
  }, [])
  return (
    <>
      {!loading ? (
        <>
          <table className={styles.recordtable}>
            <thead>
              <tr>
                <th>SN</th>
                <th>User Name</th>
                <th>Crime Nature</th>
                <th>Crime Status</th>
                <th>Imprisonment</th>
                <th>Bail Amount</th>
                <th>Registered By</th>
                <th>Visit Profile</th>
              </tr>
            </thead>

            {records
              .filter((record) => {
                if (record.user.name === '') {
                  return record
                } else if (
                  record.user.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  record.crimeNature
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  record.RegisteredBy.toLowerCase().includes(
                    search.toLowerCase()
                  )
                ) {
                  return record
                }
              })
              .map((record) => (
                <tbody key={record._id}>
                  <tr>
                    <td data-label="User Id">{(count += 1)}</td>
                    <td data-label="User name">{record?.user?.name}</td>
                    <td data-label="Crime Nature">{record.crimeNature}</td>
                    <td data-label="Crime Status">{record.crimeStatus}</td>
                    <td data-label="Imprisonment">{record.imprisonment}</td>
                    <td data-label="BailAmount">{record.bailAmount}</td>
                    <td data-label="Registered By">{record.RegisteredBy}</td>
                    <td data-label="Visit Profile">
                      <button
                        type="submit"
                        className={styles.btn}
                        onClick={() =>
                          navigate(`/user/${record._id}`, {
                            state: record.user.status || null,
                          })
                        }
                        style={{ width: '120px', fontSize: '18px' }}
                      >
                        Visit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </>
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}
        >
          <img src="/images/spinner.gif" alt="loading" height={40} />
        </div>
      )}
    </>
  )
}

export default RecordTable
