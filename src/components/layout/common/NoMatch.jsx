import { useNavigate } from 'react-router-dom'
import React from 'react'
import styles from './nomatch.module.css'

const NoMatch = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Error: 404 </h1>
        <div className={styles.btngroup}>
          <button onClick={() => navigate('/')} className={styles.btn}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoMatch
