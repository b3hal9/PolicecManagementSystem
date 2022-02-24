import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './login.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { confirmPasswordReset } from '../../store/actions/authAction'

const formValidations = Yup.object().shape({
  number: Yup.number().required().label('Number'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password').min(8),
})

const ResetPage = () => {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handlePassword = (e) => {
    e.preventDefault()
    showPass ? setShowPass(false) : setShowPass(true)
  }
  const handleSubmit = async (values) => {
    await dispatch(confirmPasswordReset(values, navigate, toast))
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Nexus</h1>
        <h4>Police Management System</h4>
      </div>
      <section className={styles.main}>
        <ToastContainer />
        <div className={styles.card}>
          <div className={styles.leftText}>
            <h3>Reset Your Password</h3>
          </div>
          <Formik
            initialValues={{ number: '', email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={formValidations}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <form className={styles.myform} onSubmit={handleSubmit}>
                <div className={styles.inputs}>
                  <label htmlFor="number">OTP Code</label>
                  <div className={styles.inputfield}>
                    <i className="fas fa-sort-numeric-up"></i>
                    <input
                      type="number"
                      id="number"
                      onBlur={handleBlur('number')}
                      onChange={handleChange('number')}
                      value={values.number}
                    />
                  </div>
                  {errors.number && touched.number ? (
                    <small className={styles.error}>{errors.number}</small>
                  ) : null}
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="email">Email Address</label>
                  <div className={styles.inputfield}>
                    <i className="fas fa-envelope errortext"></i>
                    <input
                      type="text"
                      id="email"
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      value={values.email}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <small className={styles.error}>{errors.email}</small>
                  ) : null}
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="password">Password</label>

                  <div className={styles.inputfield}>
                    <i className="fas fa-lock"></i>
                    <input
                      type={showPass ? 'text' : 'password'}
                      id="password"
                      onBlur={handleBlur('password')}
                      onChange={handleChange('password')}
                      value={values.password}
                    />
                    <button className={styles.btn} onClick={handlePassword}>
                      <i
                        className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}
                      ></i>
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <small className={styles.error}>{errors.password}</small>
                  ) : null}
                </div>

                <button className={styles.loginbutton} type="submit">
                  Submit
                </button>

                <div className={styles.formText}>
                  <small>
                    <a href="/">Cancel</a>
                  </small>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  )
}

export default ResetPage
