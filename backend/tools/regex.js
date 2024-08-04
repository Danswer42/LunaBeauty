const regex = {
  name: /^[A-Za-z'\s]{3,50}$/,
  lastName: /^[A-Za-z\s]{3,50}$/,
  email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
  phone: /^\\\+?\\d{9,15}$/,
  description: /^[a-zA-Z0-9\s,.':¡¿¡"ñáéíóúüÑÁÉÍÓÚÜ]{2,500}$/ 
};

regex.name = new RegExp(regex.name, "i")
regex.lastName = new RegExp(regex.lastName, "i")
regex.email = new RegExp(regex.email, "i")
regex.password = new RegExp(regex.password, "i")
regex.phone = new RegExp(regex.phone, "i")
regex.description = new RegExp(regex.description, "i")

const validation = (data) => {
  if(!regex.name.test(data.name) || !regex.lastName.test(data.lastName) ||
    !regex.description.test(data.description) || !regex.email.test(data.email)
    || !regex.password.test(data.password) || !regex.phone.test(data.phone))
    {
      return false;
    }
    return true;
};

regex.validation = validation

module.exports = regex;

