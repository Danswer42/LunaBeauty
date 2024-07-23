const regex = {
  name: /^[A-Za-z\s]{3,50}$/,
  lastName: /^[A-Za-z\s]{3,50}$/,
  email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
  phone: /^\\\+?\\d\{9,15\}/,
  description: /^(?!.*[^\w\s]).{2,500}$/
}

//aceptar coma y punto en la descripcion
//aceptar comilla simple en el nombre
