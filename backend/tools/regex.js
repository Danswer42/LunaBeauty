const regex = {
  name: /^[A-Za-zÀ-ÿÑñ'\s]{3,50}$/,
  lastname: /^[A-Za-zÀ-ÿÑñ'\s]{3,50}$/,
  email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
  phone: /^(\+58)?\s*(\d{3,4})?\s*(\d{7})$/,
  description: /^[a-zA-Z0-9\s,.':¡¿¡"ñáéíóúüÑÁÉÍÓÚÜ]{2,500}$/ 
};

regex.name = new RegExp(regex.name, "i")
regex.lastname = new RegExp(regex.lastname, "i")
regex.email = new RegExp(regex.email, "i")
regex.password = new RegExp(regex.password, "i")
regex.phone = new RegExp(regex.phone, "i")
regex.description = new RegExp(regex.description, "i")


const validation = (data) => {
  if(!regex.name.test(data.name) || !regex.lastname.test(data.lastname) ||
    !regex.description.test(data.description) || !regex.email.test(data.email)
    || !regex.password.test(data.password) || !regex.phone.test(data.phone))
    {
      return false;
    }
    return true;
};

regex.validation = validation

module.exports = regex;

