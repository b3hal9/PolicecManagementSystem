import { useDispatch } from 'react-redux'
import { RegisterHandler } from '../../store/actions/authAction'
import styles from './register.module.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'

const formValidations = Yup.object().shape({
  id: Yup.number().min(6).required(),
  name: Yup.string().min(5).max(50).required(),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required()
    .label('Password')
    .min(8)
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,50}$/,
      'Please use strong password'
    ),
  address: Yup.string().min(5).max(50).required(),
  phone: Yup.number().required().min(10),
})

const ResiterForm = () => {
  const [showPass, setShowPass] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handlePassword = (e) => {
    e.preventDefault()
    showPass ? setShowPass(false) : setShowPass(true)
  }
  const handleSubmit = (values) => {
    dispatch(RegisterHandler(values, navigate, toast))
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
            <h3>Create Your Account</h3>
          </div>
          <Formik
            initialValues={{
              id: '',
              name: '',
              email: '',
              password: '',
              address: '',
              phone: '',
            }}
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
                <div className={styles.item}>
                  <div className={styles.inputs}>
                    <label htmlFor="id">Department Id</label>
                    <div className={styles.inputfield}>
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        id="id"
                        onBlur={handleBlur('id')}
                        onChange={handleChange('id')}
                        value={values.id}
                      />
                    </div>
                    {errors.id && touched.id ? (
                      <small className={styles.error}>{errors.id}</small>
                    ) : null}
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="name">Department Name</label>
                    <div className={styles.inputfield}>
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        id="name"
                        onBlur={handleBlur('name')}
                        onChange={handleChange('name')}
                        value={values.name}
                      />
                    </div>
                    {errors.name && touched.name ? (
                      <small className={styles.error}>{errors.name}</small>
                    ) : null}
                  </div>
                </div>
                <div className={styles.item}>
                  {' '}
                  <div className={styles.inputs}>
                    <label htmlFor="email">Email Address</label>
                    <div className={styles.inputfield}>
                      <i className="fas fa-envelope"></i>
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

                      <i
                        onClick={handlePassword}
                        className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}
                      ></i>
                    </div>
                    {errors.password && touched.password ? (
                      <small className={styles.error}>{errors.password}</small>
                    ) : null}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.inputs}>
                    <label htmlFor="address">Address</label>
                    <div className={styles.inputfield}>
                      <i className="fas fa-map-marker-alt"></i>
                      <input
                        type="text"
                        id="address"
                        onBlur={handleBlur('address')}
                        onChange={handleChange('address')}
                        value={values.address}
                      />
                    </div>
                    {errors.address && touched.address ? (
                      <small className={styles.error}>{errors.address}</small>
                    ) : null}
                  </div>
                  <div className={styles.inputs}>
                    <label htmlFor="phone">Contact No.</label>
                    <div className={styles.inputfield}>
                      <i className="fas fa-phone-alt"></i>
                      <input
                        type="number"
                        id="phone"
                        onBlur={handleBlur('phone')}
                        onChange={handleChange('phone')}
                        value={values.phone}
                      />
                    </div>
                    {errors.phone && touched.phone ? (
                      <small className={styles.error}>{errors.phone}</small>
                    ) : null}
                  </div>
                </div>
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
          <div className={styles.formText}>
            <small>
              Already have an account?
              <a href="/login">Login</a>
            </small>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResiterForm
