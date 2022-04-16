import { React, useState } from 'react';
import {Formik, Field, Form, ErrorMessage, useField} from 'formik';

const AuthForm = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Formik
          initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
          }}
          validationSchema = {yup.object({
            email: yup.string()
                    .email('Неправильный email адрес')
                    .required('Обязательное поле'),
            password: yup.string()
                    .min(4,'Минимальная длина пароля - 4 символа')
                    .required('Обязательное поле'),
          })}
          onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
          <Form className="form">
            <div className='form_inner'>
            <h3>Отправить пожертвование</h3>
              <MyTextInput
                label={'Ваше имя'}
                id="name"
                name="email"
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
              <MyTextInput
                label={'Ваша почта'}
                id="email"
                name="password"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              <label htmlFor="amount">Количество</label>
              <ErrorMessage className='error' name='terms' component='div' />
              <button type="submit">Отправить</button>
            </div>
              
          </Form>
        </Formik>
  )
}
export default AuthForm;