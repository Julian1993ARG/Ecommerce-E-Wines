import axios from 'axios'
import * as Yup from 'yup'
import { types, provinces, varietales } from './data'

const startWichLetter = /^[^0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][a-zA-Z0-9$-?¿¡!%.,\s]*$/gi // eslint-disable-line
const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm
// at least 8 characters
// - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
// - Can contain special characters
// const urlApi = 'https://e-winespf.herokuapp.com'
const urlApi = 'http://localhost:3001'
// http:///users/email/:email
// users/username/:username

export const schemaFormPubli = Yup.object().shape({
  title: Yup.string().required('Es Requerido').matches(startWichLetter, 'Debe comenzar con una letra').min(3, 'Min 3 caracteres').max(50, 'Max 50 caracteres'),
  price: Yup.number('Solo números').required('Es Requerido').min(500, 'Min $500').positive('Positive number').max(500000, 'Max $500.000'),
  description: Yup.string().required('Es Requerido').min(10, 'Min 10 caracteres').max(150, 'Max 150 caracteres'),
  count: Yup.number().integer('No números decimales').required('Es Requerido').min(1, 'Min 1').positive('Min 1').max(10000, 'Max 10.000'),
  productId: Yup.string().required('Por favor seleccione un producto').uuid(),
  image: Yup.mixed().required('Es Requerido')
    .test('fileSize', 'La imagen es requerida', value => value && value.size >= 1000)
    .test('fileSize', 'Max 5 MB ', value => value && value.size <= 5000000)
    .test('fileFormat', 'Solo jpg, jpge, gif, png', value => value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type))
})

export const schemaFormProduct = Yup.object().shape({
  name: Yup.string().required('Es Requerido').matches(startWichLetter, 'Debe comenzar con una letra').min(3, 'Min 3 caracteres').max(50, 'Max 50 caracteres'),
  type: Yup.string().required('Es Requerido').oneOf(types),
  varietal: Yup.string().required('Es Requerido').oneOf(varietales),
  origin: Yup.string().required('Es Requerido').oneOf(provinces),
  cellar: Yup.string().required('Es Requerido').min(3, 'Min 3 caracteres').max(50, 'Max 50 caracteres'),
  img: Yup.mixed().required('Es Requerido')
    .test('fileSize', 'La imagen es requerida', value => value && value.size >= 1000)
    .test('fileSize', 'Max 3 MB ', value => value && value.size <= 3000000)
    .test('fileFormat', 'Solo jpg, jpge, gif, png', value => value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type))
})
export const schemaFormVarietal = Yup.object().shape({
  name: Yup.string().required('Es Requerido').matches(startWichLetter, 'Debe comenzar con una letra').min(3, 'Min 3 caracteres').max(50, 'Max 50 caracteres').oneOf(varietales)
})

export const schemaValidateUser = Yup.object().shape({
  username: Yup.string().required('Es Requerido')
    .matches(startWichLetter, 'Debe comenzar con una letra')
    .min(3, 'Min 3 caracteres').max(50, 'Max 50 caracteres')
    .test('testEmail', 'Este usuario ya existe',
      value => {
        return new Promise((resolve, reject) => {
          axios.get(`${urlApi}/users/username/${value}`)
            .then(res => {
              resolve(true)
            })
            .catch(error => {
              if (error.response.data === true) {
                resolve(false) // eslint-disable-line
              }
            })
        })
      }),
  email: Yup.string().email('Email no válido').required('Es Requerido')
    .test('testEmail', 'Este correo ya existe',
      value => {
        return new Promise((resolve, reject) => {
          axios.get(`${urlApi}/users/email/${value}`)
            .then(res => {
              resolve(true)
            })
            .catch(error => {
              if (error.response.data === true) {
                resolve(false) // eslint-disable-line
              }
            })
        })
      }),
  password: Yup.string().required('Es Requerido')
    .min(8, 'Min 8 caracteres')
    .matches(passwordValidate, 'Debe contener al menos 1 mayúscula, 1 minúscula y 1 número')
    .oneOf([Yup.ref('copyPassword'), null], 'Las contraseñas no coinciden').max(20, 'Max 20 caracteres'),
  copyPassword: Yup.string().required('Es Requerido').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
  region: Yup.string().required('Por favor seleccione una Provincia').oneOf(provinces)
})

export const schemaValidateEmail = Yup.object().shape({
  email: Yup.string().email('Email no válido').required('Es Requerido')
    .test('testEmail', 'Este correo no existe como cuenta',
      value => {
        return new Promise((resolve, reject) => {
          axios.get(`${urlApi}/users/email/${value}`)
            .then(res => {
              resolve(false)
            })
            .catch(error => {
              if (error.response.data === true) {
                resolve(true) // eslint-disable-line
              }
            })
        })
      })
})

export const schemaValidateChangesOfUser = Yup.object().shape({
  password: Yup.string().required('Es Requerido')
    .min(8, 'Min 8 caracteres'),
  /* .matches(passwordValidate, 'Debe contener al menos 1 mayúscula, 1 minúscula y 1 número'), */
  newPassword: Yup.string().required('Es Requerido')
    .min(8, 'Min 8 caracteres')
    .matches(passwordValidate, 'Debe contener al menos 1 mayúscula, 1 minúscula y 1 número')
    .oneOf([Yup.ref('repeatNewPassword'), null], 'Las contraseñas no coinciden').max(20, 'Max 20 caracteres'),
  repeatNewPassword: Yup.string().required('Es Requerido').oneOf([Yup.ref('repeatNewPassword'), null], 'Las contraseñas no coinciden')
})

export const schemaValidatePasswordEmail = Yup.object().shape({
  password: Yup.string().required('Es Requerido')
    .min(8, 'Min 8 caracteres')
    .matches(passwordValidate, 'Debe contener al menos 1 mayúscula, 1 minúscula y 1 número')
    .oneOf([Yup.ref('repeatPassword'), null], 'Las contraseñas no coinciden').max(20, 'Max 20 caracteres'),
  repeatPassword: Yup.string().required('Es Requerido').oneOf([Yup.ref('repeatPassword'), null], 'Las contraseñas no coinciden')
})

export const schemaLogin = Yup.object().shape({
  email: Yup.string().email('Formato inválido').required('Es requerido'),
  password: Yup.string().required('Es requerido')
})

// FUNCTION VALIDATE URL IMAGE
export const validateUrl = (value) => {
  if (/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(value)) {
    return true
  } else return false
}

export const schemaUrl = Yup.object().shape({
  url: Yup.string().required().matches(/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi, 'Invalid url')
})

// CLOUDINARY FUNCTION UPLOAD AN IMG
export const uplodCloudinary = async (file) => {
  try {
    const cloudName = 'dfq27ytd2'
    const preset = 'cpnushlf'
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`

    const formData = new FormData()
    formData.append('upload_preset', preset)
    formData.append('file', file)

    const send = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const response = await send.json()
    const urlImage = response.secure_url
    if (validateUrl(urlImage)) {
      return urlImage
    } else throw Error('url not valid')
    // END CLOUDINARY
  } catch (error) {
    console.log(error)
  }
}
