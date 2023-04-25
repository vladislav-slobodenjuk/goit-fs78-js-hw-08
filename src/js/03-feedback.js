import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
// const emailEl = document.querySelector("[name = 'email']");
// const messageEl = document.querySelector("[name = 'message']");

const sevedData = JSON.parse(localStorage.getItem('feedback-form-state'));
let formState = {};

if (sevedData) {
  formState = sevedData;
  console.log('there is saved state');
  const { email, message } = formEl.elements;
  // console.log(formEl.elements);
  // console.log(email);

  email.value = sevedData[`${email.name}`];
  message.value = sevedData[`${message.name}`];
} else {
  console.log("there isn't saved state");
}

formEl.addEventListener('input', throttle(onImputChange, 500));
formEl.addEventListener('submit', onSubmit);

function onImputChange() {
  const formData = new FormData(formEl);
  const data = {};
  formData.forEach((value, field) => {
    data[field] = value.trim();
  });
  console.log('state was updated', data);

  const stringifiedData = JSON.stringify(data);
  localStorage.setItem('feedback-form-state', stringifiedData);
  formState = data;
}

function onSubmit(e) {
  e.preventDefault();
  //
  console.log('submited data', formState);
  localStorage.removeItem('feedback-form-state');
  console.log('state was removed');

  e.target.reset();
  formState = {};
}
