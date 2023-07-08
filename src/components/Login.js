import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import { notify } from "./toast";
import styles from "./Login.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(data);
    setErrors(validate(data, "login"));
    // console.log(errors);
  }, [data, touched]);

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };
  //   console.log(touched);

  function blurHandler(event) {
    setTouched({ ...touched, [event.target.name]: false });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("You loged in successfully", "success");
    } else {
      notify("Invalid data!", "error");
      setTouched({
        email: true,
        password: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <h2 className={styles.header}>Login</h2>
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
        <div className={styles.formButtons}>
          <Link to="/signup">Sign Up</Link>
          <button>Login</button>
        </div>
      </form>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default Login;
