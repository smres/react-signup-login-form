import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import { notify } from "./toast";
import styles from "./SignUp.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    isAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    console.log(data);
    setErrors(validate(data, "signup"));
    console.log(errors);
  }, [data, touched]);

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };
  console.log(touched);

  function blurHandler(event) {
    setTouched({ ...touched, [event.target.name]: false });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("You signed in successfully", "success");
    } else {
      notify("Invalid data!", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmpassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <h2 className={styles.header}>Sign Up</h2>
        <div className={styles.formField}>
          <label htmlFor="name">Name</label>
          <input
            className={
              errors.name && touched.name
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            value={data.name}
            onChange={changeHandler}
            id="name"
            name="name"
            onFocus={focusHandler}
            // onBlur={blurHandler}
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="email">Email</label>
          <input
            className={
              errors.email && touched.email
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            value={data.email}
            onChange={changeHandler}
            id="email"
            name="email"
            onFocus={focusHandler}
            // onBlur={blurHandler}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <input
            className={
              errors.password && touched.password
                ? styles.uncompleted
                : styles.formInput
            }
            autoComplete="on"
            type="password"
            value={data.password}
            onChange={changeHandler}
            id="password"
            name="password"
            onFocus={focusHandler}
            // onBlur={blurHandler}
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={styles.formField}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            className={
              errors.confirmpassword && touched.confirmpassword
                ? styles.uncompleted
                : styles.formInput
            }
            autoComplete="on"
            type="password"
            value={data.confirmpassword}
            onChange={changeHandler}
            id="confirmpassword"
            name="confirmpassword"
            onFocus={focusHandler}
            // onBlur={blurHandler}
          />
          {errors.confirmpassword && touched.confirmpassword && (
            <span>{errors.confirmpassword}</span>
          )}
        </div>
        <div className={styles.formField}>
          <div className={styles.checkBoxContainer}>
            <input
              type="checkbox"
              value={data.isAccepted}
              onChange={changeHandler}
              id="isAccepted"
              name="isAccepted"
              onFocus={focusHandler}
              // onBlur={blurHandler}
            />
            <label htmlFor="isAccepted">I accept term & privacy policy</label>
          </div>
          {errors.isAccepted && touched.isAccepted && (
            <span>{errors.isAccepted}</span>
          )}
        </div>
        <div className={styles.formButtons}>
          <Link to="/login">Login</Link>
          <button>Sign Up</button>
        </div>
      </form>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default SignUp;
