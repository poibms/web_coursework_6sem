import { React, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../config/routesConsts';
import * as yup from 'yup';
import './authForm.scss';

const AuthForm = ({onSubmit}) => {
  const location = useLocation();
  const isLoginPath = location.pathname === LOGIN_ROUTE;

  const onSubmitForm = (email, password) => {
    onSubmit(isLoginPath, email, password);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={yup.object({
        email: yup
          .string()
          .email('Не правильный формат email')
          .required('* Обязательное поле'),
        password: yup.string()
        .min(4,'Минимальная длинна пароля 4 символа')
        .required('* Обязательное поле')
      })}
      onSubmit={({ email, password }) => {
        onSubmitForm(email, password);
      }}
    >
      <Form className="form">
        <div className="form_inner">
          <h3 htmlFor="charName">{isLoginPath ? 'Войти' : 'Авторизация'}</h3>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <ErrorMessage
            component="div"
            className="form_error"
            name="email"
          />
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <ErrorMessage
            component="div"
            className="form_error"
            name="password"
          />
          {isLoginPath ? (
            <input type="submit" value={'Войти'} />
          ): (
            <input type="submit" value={'Авторизация'} />
          )}
        </div>
      </Form>
    </Formik>
  );
};
export default AuthForm;
