import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);
  const { msgError } = state;
  const [formValues, handleInputChange] = useForm({
    name: 'Alonso',
    email: 'alonso@gmail.com',
    password: '123456',
    password2: '123456',
  });

  const { name, email, password, password2 } = formValues;
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is Required'));
      console.log('Name is Required');
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid'));
      console.log('Email is not valid');
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          'Password should be at least 6 characters and match each other'
        )
      );
      console.log(
        'Password should be at least 6 characters and match each other'
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleRegister}
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
          className="auth__input"
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Login
        </button>

        <Link className="link" to="/auth/login">
          Already Registered?
        </Link>
      </form>
    </>
  );
};
