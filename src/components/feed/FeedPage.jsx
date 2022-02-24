import React, { useEffect } from 'react'
import styles from '../styles/feed.module.css'
import FeedForm from './FeedForm'
import FeedCard from './FeedCard'
import { handle_getAllPost } from '../../store/actions/postActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NexusNav from '../layout/common/navbar/NexusNav'
import Footer from '../layout/common/footer/Footer'

const FeedPage = () => {
  const { posts, loading } = useSelector((state) => state.post_data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handle_getAllPost())
  }, [dispatch])
  return (
    <>
      <NexusNav />
      <div className={styles.container}>
        <FeedForm />
        {!loading ? (
          posts.map((post) => <FeedCard post={post} key={post._id} />)
        ) : (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}
          >
            <img src="/images/spinner.gif" alt="loading" height={40} />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default FeedPage
