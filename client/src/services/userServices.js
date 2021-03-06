import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const registration = async(email, password) => {
  const {data} = await $host.post('/api/user/', {email, password});
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token);
}

export const login = async(email, password) => {
  const {data} = await $host.post('/api/user/login', {email, password});
  const user = jwt_decode(data.token);
  console.log(user)
  if(user.status !== 'BANNED') {
    localStorage.setItem('token', data.token)
    return user;
  }
  alert('You are was banned')
}

export const check = async() => {
  const {data} = await $authHost.get('/api/user/auth');
  localStorage.setItem('token', data.token)
  return data;
}

export const getAllUsers = async() => {
  const {data} = await $host.get('/api/user/all');
  return data;
}

export const limitUser = async(id) => {
  const {data} = await $authHost.put(`/api/user/limit/${id}`);
  return data;
}