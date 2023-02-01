import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
    data() {
      return {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        user: {
          username: '',
          password: '',
        },
      }
    },
    methods: {
      login() {
        axios.post(`${this.apiUrl}/admin/signin`, this.user)
          .then((res) => {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${ token }; expires=${ new Date(expired) };`;
            axios.defaults.headers.common['Authorization'] = token;
            alert("登入成功");
            window.location = 'products.html';
          })
          .catch((error) => {
            console.dir(error);
            alert(error.data.error.message);
          })
      },
    },
  }).mount('#app');