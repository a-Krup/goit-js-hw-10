import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const delayInput = document.querySelector('.ms');
  const radioButtons = document.querySelectorAll('input[name="state"]');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = parseInt(delayInput.value);

    const state = Array.from(radioButtons).find(radio => radio.checked)?.value;

    if (!delay || !state) return;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then(resolvedDelay => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
          position: 'topRight',
        });
      })
      .catch(rejectedDelay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${rejectedDelay}ms`,
          position: 'topRight',
        });
      });
  });
});
