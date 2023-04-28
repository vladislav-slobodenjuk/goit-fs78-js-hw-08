import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');

const LOCAL_STORAGE_KEY = 'feedback-form-state';
let formState = {};

window.addEventListener('DOMContentLoaded', onLoad);
formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onSubmit);

function onLoad() {
  const sevedData = getSavedData(LOCAL_STORAGE_KEY);
  if (!sevedData) return console.log("there isn't saved data");

  console.log('there is saved data:', sevedData);
  formState = sevedData;

  const fields = Object.keys(formState);
  fields.forEach(field => (formEl.elements[field].value = formState[field]));
}

function getSavedData(storageKey) {
  return JSON.parse(localStorage.getItem(storageKey));
}

function onInputChange({ target }) {
  formState[target.name] = target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formState));
  console.log('state was updated and saved:', formState);
}

function onSubmit(e) {
  e.preventDefault();
  const data = collectFormData(e.target);
  const values = Object.values(data);

  for (const item of values) {
    if (item.length === 0) return alert('fill in all fields');
  }

  clearAllData(e.target);
  console.log('submited data:', data); // instead of return
}

function collectFormData(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, field) => (data[field] = value.trim()));
  return data;
}

function clearAllData(form) {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  form.reset();
  formState = {};
  console.log('state was cleared');
}
