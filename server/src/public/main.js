/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const app = new Vue({
  el: '#app',
  data: {
    name: '',
    url: '',
    error: '',
    encodedImage: '',
    success: false,
    qrSuccess: false,
  },
  methods: {
    reset() {
      this.name = '';
      this.url = '';
      this.success = false,
      this.qrSuccess = false;
    },
    createQR() {
      this.qrSuccess = true;
      const body = {
        name: this.name,
      };
      fetch('/api/qrcode', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.encodedImage = result.data.split(',')[1];
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createUrl() {
      const body = {
        name: this.name,
        url: this.url,
      };
      fetch('/api/billy', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.isJoi) {
            this.error = result.details
              .map((detail) => detail.message)
              .join('. ');
          } else if (result.wrong) {
            this.error = result.details
              .map((detail) => detail.message)
              .join('. ');
          } else {
            this.success = true;
            this.error = '';
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});