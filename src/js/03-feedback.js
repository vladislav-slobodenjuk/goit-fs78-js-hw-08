import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
// const emailEl = document.querySelector("[name = 'email']");
// const messageEl = document.querySelector("[name = 'message']");

const LOCAL_STORAGE_KEY = 'feedback-form-state';
let formState = {};

const sevedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

if (sevedData) {
  // Object.assign(formState, sevedData);
  // console.log(formState);

  console.log('there is saved state');
  formState = sevedData;

  // console.log('file: 03-feedback.js:21  formEl.elements:', formEl.elements);
  // formEl.elements.forEach(elem => {
  //   elem.value = formState[elem.name];
  //   console.log('aa');
  // });

  const fields = Object.keys(formState);
  console.log('file: 03-feedback.js:25  fields:', fields);

  fields.forEach(field => {
    formEl.elements[field].value = formState[field];
  });

  // const { email, message } = formEl.elements;
  // email.value = sevedData[`${email.name}`];
  // message.value = sevedData[`${message.name}`];
} else {
  console.log("there isn't saved state");
}

formEl.addEventListener('input', throttle(onImputChange, 500));
formEl.addEventListener('submit', onSubmit);

function onImputChange({ target }) {
  // const formData = new FormData(formEl);
  // const data = {};
  // formData.forEach((value, field) => {
  //   data[field] = value.trim();
  // });

  formState[target.name] = target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formState));
  console.log('state was updated', formState);
}

function onSubmit(e) {
  e.preventDefault();
  //
  const formData = new FormData(formEl);
  const data = {};
  formData.forEach((value, field) => {
    data[field] = value.trim();
  });

  const values = Object.values(data);

  for (const item of values) {
    if (item.length === 0) return alert('fill in all fields');
  }

  console.log('submited data:', data); // instead of return

  localStorage.removeItem(LOCAL_STORAGE_KEY);
  e.target.reset();
  formState = {};

  console.log('state was cleaned');
}
