import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footersection}>
      <h3>&#169; PMS 2021</h3>
      <div className={styles.socials}>
        <a href="">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="">
          <i className="fab fa-google"></i>
        </a>
        <a href="">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </footer>
  )
}

export default Footer
