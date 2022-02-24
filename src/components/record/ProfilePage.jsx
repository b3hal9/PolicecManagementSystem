import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import apiClient from '../../utils/client'
import styles from '../styles/profile.module.css'
import Footer from '../layout/common/footer/Footer'
import NexusNav from '../layout/common/navbar/NexusNav'

const ProfilePage = () => {
  const { state } = useLocation()
  const endpoint = useParams()
  const [user, setUser] = useState('')

  let pattern = /(\w)\w*\s*(\w)\w*/g
  let result = pattern.exec(user.name || user?.user?.name)
  const avatar = result[1] + result[2]
  useEffect(() => {
    async function loadData() {
      if (state === null) {
        const result = await apiClient.get(`/crimeUser?id=${endpoint.id}`)
        if (result.ok) {
          const obj = result.data
          const user = obj[0].user
          setUser(user)
        } else {
          console.log(result.data)
        }
      } else if (state === 'verified') {
        const response = await apiClient.get(`/user?id=${endpoint.id}`)

        if (response.ok) {
          const obj = response.data
          const user = obj[0]
          setUser(user)
        } else {
          console.log(response.data)
          return
        }
      }
    }
    loadData()
  }, [user, state, endpoint])

  return (
    <>
      <NexusNav />
      <section className={styles.profilesection}>
        <div className={styles.profilecard}>
          <div className={styles.avatar}>
            {/* <img
              // src=""
              alt="user"
              className={styles.userimg}
              height={80}
              width={80}
            /> */}
            <h3>{avatar}</h3>
          </div>
          <h1>{user.name || user?.user?.name}</h1>
          <h3>{user.email || user?.user?.email}</h3>
          <h3>{user.address}</h3>
          <i className="fas fa-check-circle"></i>
        </div>

        <table className={styles.recordtable}>
          <thead>
            <tr>
              <th>SN.</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Document Type</th>
              <th>Document Id</th>
              <th>Religion</th>
              <th>Occupation</th>
              <th>User Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="SN.">1</td>
              <td data-label="Date of Birth">{user.dob}</td>
              <td data-label="Gender">{user.sex || user.gender}</td>
              <td data-label="Document Type">{user.documentType}</td>
              <td data-label="Document Id">{user.documentId}</td>
              <td data-label="Religion">{user.religion}</td>
              <td data-label="Occupation">{user.occupation}</td>
              <td data-label="User Id">{endpoint.id}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  )
}

export default ProfilePage
