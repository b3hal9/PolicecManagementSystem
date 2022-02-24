import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from './login.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { handlePasswordReset } from '../../store/actions/authAction'

const formValidations = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
})

const ResetForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    await dispatch(handlePasswordReset(values, navigate, toast))
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
            <h3>Forgot Your Password</h3>
          </div>
          <Formik
            initialValues={{ email: '' }}
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
                <button className={styles.loginbutton} type="submit">
                  Reset Password
                </button>

                <div className={styles.formText}>
                  <small>
                    <a href="/login">Go Back</a>
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

export default ResetForm
