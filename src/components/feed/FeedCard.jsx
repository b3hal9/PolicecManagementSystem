import styles from '../styles/feed.module.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { handle_deletePost } from '../../store/actions/postActions'
import { toast, ToastContainer } from 'react-toastify'

const FeedCard = (props) => {
  const { user } = useSelector((state) => state.auth)
  const { title, description, image, author, createdAt, _id } = props.post
  let time = moment(createdAt).format('MM/DD/YYYY, hA')

  let pattern = /(\w)\w*\s*(\w)\w*/g
  let result = pattern.exec(author.name || user.name)
  const avatar = result[1] + result[2]
  const dispatch = useDispatch()

  const deletePost = () => {
    console.log('post', _id)
    dispatch(handle_deletePost(_id, toast))
  }
  return (
    <div className={styles.box2}>
      <ToastContainer />
      <div className={styles.postTop}>
        <div className={styles.authorSection}>
          <div className={styles.avatar}>
            <h3>{avatar}</h3>
          </div>
          <h3 className={styles.author}>{author.name || user.name}</h3>
        </div>
        <div className={styles.posttime}>
          <i className="fas fa-clock">
            &nbsp;<span>{time}</span>
          </i>
        </div>
      </div>
      <h1 className={styles.postTitle}>{title}</h1>
      <p>{description}</p>
      {image && (
        <img
          src={'http://localhost:5000/' + image}
          alt="post"
          className={styles.postImage}
          width="100%"
          height={400}
          style={{ marginTop: 5, borderRadius: 8, overflow: 'hidden' }}
        />
      )}
      <div className={styles.textbuttons}>
        <div className={styles.activebuttons}>
          {/* <div className={styles.viewbox}>
            <i className="fas fa-eye"></i>
            <span>1200 Views</span>
          </div> */}
        </div>

        <div className={styles.passivebuttons}>
          {/* <div
            className={styles.btn}
            style={{
              backgroundColor: 'tomato',
              width: '40px',
              marginRight: '5px',
            }}
          >
            <i className="fas fa-edit"></i>
          </div> */}
          <button
            className={styles.btn}
            style={{
              backgroundColor: 'tomato',
              width: '40px',
              marginRight: '5px',
            }}
            onClick={deletePost}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
