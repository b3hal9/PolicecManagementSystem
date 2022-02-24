import { useState } from 'react'
import styles from './navbar.module.css'
import { useDispatch } from 'react-redux'
import { Logout } from '../../../../store/actions/authAction'

const NexusNav = () => {
  const [show, setshow] = useState(false)
  const handleMenu = () => {
    setshow(true)
  }
  const handleClose = () => {
    setshow(false)
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(Logout())
  }
  return (
    <>
      <button
        className={styles.closebtn}
        onClick={handleClose}
        style={{ display: show ? 'flex' : 'none' }}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* side nav */}
      <div
        className={styles.sidenav}
        style={{ display: show ? 'flex' : 'none' }}
      >
        <ul>
          <li>
            <a href="/feed">Feed</a>
          </li>
          <li>
            <a href="/record">Records</a>
          </li>
          <li>
            <a href="/inbox">Inbox</a>
          </li>
        </ul>
      </div>
      {/* top nav */}
      <div className={styles.topnav}>
        <div
          className={styles.logo}
          // style={{ display: search ? 'none' : 'flex' }}
        >
          <button className={styles.btn} onClick={handleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <a href="/" className={styles.logoTitle}>
            Nexus
          </a>
        </div>
        <div className={styles.navlist}>
          <ul>
            <li>
              <a href="/feed">Feed</a>
            </li>
            <li>
              <a href="/record">Records</a>
            </li>
            <li>
              <a href="/inbox">Inbox</a>
            </li>
            <li>
              <a href="/setting">Setting</a>
            </li>
          </ul>
        </div>

        <div className={styles.end}>
          <div className={styles.endSection}>
            <button className={styles.logoutbtn} onClick={handleLogout}>
              Logout
            </button>

            <img
              src="/images/user.png"
              alt="avatar"
              width={50}
              height={50}
              className={styles.useravatar}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default NexusNav
