import styles from "../styles/record.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CSVparser } from "../../utils/csvReader";
import {
  handle_addRecord,
  handle_csvRecord,
} from "../../store/actions/recordAction";
import { toast, ToastContainer } from "react-toastify";

const formValidations = Yup.object().shape({
  userId: Yup.string().min(6).required().label("User Id"),
  crimeNature: Yup.string().min(4).max(50).required().label("Crime Nature"),
  crimeStatus: Yup.string().min(4).max(50).required().label("Crime Status"),
  imprisonment: Yup.string().min(3).max(50).required().label("Imprisonment"),
  bailAmount: Yup.number().required().label("Bail Amount/Fine"),
  RegisteredBy: Yup.string()
    .required()
    .min(6)
    .max(50)
    .label("Police Department"),
});
function RecordForm() {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [crimes, setCrimes] = useState(null);

  const handleCSV = (e) => {
    setFile(e.target.files[0]);
  };
  const sendCSV = async () => {
    const crimeArray = CSVparser(file);
    setCrimes(crimeArray);
    if (crimes !== null) {
      const newdata = crimes.data;
      await dispatch(handle_csvRecord(newdata, toast));
    }
  };

  const sendRecord = (values) => {
    dispatch(handle_addRecord(values, toast));
  };
  return (
    <Formik
      initialValues={{
        userId: "",
        crimeNature: "",
        crimeStatus: "",
        imprisonment: "",
        bailAmount: "",
        RegisteredBy: "",
      }}
      onSubmit={sendRecord}
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
        <div className={styles.entrybox}>
          <ToastContainer />
          <form className={styles.recordform} onSubmit={handleSubmit}>
            <h1>Enter New Crime Record</h1>
            <div className={styles.inputs}>
              <label htmlFor="userId">User Id</label>
              <input
                type="text"
                id="userId"
                onBlur={handleBlur("userId")}
                onChange={handleChange("userId")}
                value={values.userId}
              />
            </div>
            {errors.userId && touched.userId ? (
              <small className={styles.error}>{errors.user_id}</small>
            ) : null}
            <div className={styles.inputs}>
              <label htmlFor="crimeNature">Crime Nature</label>
              <input
                type="text"
                id="crimeNature"
                onBlur={handleBlur("crimeNature")}
                onChange={handleChange("crimeNature")}
                value={values.crimeNature}
              />
            </div>
            {errors.crimeNature && touched.crimeNature ? (
              <small className={styles.error}>{errors.crimeNature}</small>
            ) : null}
            <div className={styles.inputs}>
              <label htmlFor="crimeStatus">Crime Status</label>

              <input
                type="text"
                id="crimeStatus"
                onBlur={handleBlur("crimeStatus")}
                onChange={handleChange("crimeStatus")}
                value={values.crimeStatus}
              />
            </div>
            {errors.crimeStatus && touched.crimeStatus ? (
              <small className={styles.error}>{errors.crimeStatus}</small>
            ) : null}
            <div className={styles.inputs}>
              <label htmlFor="imprisonment">Imprisonment</label>
              <input
                type="text"
                id="imprisonment"
                onBlur={handleBlur("imprisonment")}
                onChange={handleChange("imprisonment")}
                value={values.imprisonment}
              />
            </div>
            {errors.imprisonment && touched.imprisonment ? (
              <small className={styles.error}>{errors.imprisonment}</small>
            ) : null}
            <div className={styles.inputs}>
              <label htmlFor="bailAmount">Bail Amount/Fine</label>
              <input
                type="number"
                id="bailAmount"
                onBlur={handleBlur("bailAmount")}
                onChange={handleChange("bailAmount")}
                value={values.bailAmount}
              />
            </div>
            {errors.bailAmount && touched.bailAmount ? (
              <small className={styles.error}>{errors.bailAmount}</small>
            ) : null}
            <div className={styles.inputs}>
              <label htmlFor="RegisteredBy">RegisteredBy</label>
              <input
                type="text"
                id="RegisteredBy"
                onBlur={handleBlur("RegisteredBy")}
                onChange={handleChange("RegisteredBy")}
                value={values.RegisteredBy}
              />
            </div>

            {errors.RegisteredBy && touched.RegisteredBy ? (
              <small className={styles.error}>{errors.RegisteredBy}</small>
            ) : null}
            <button type="submit" className={styles.btn}>
              Sumbit
            </button>
          </form>
          <div className={styles.csvinput}>
            <label htmlFor="record">Import from CSV file</label>
            <input type="file" name="record" onChange={handleCSV} required />
            <button type="submit" className={styles.btn} onClick={sendCSV}>
              Load
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default RecordForm;
