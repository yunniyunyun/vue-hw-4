import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
    data() {
      return {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        apiPath: 'winter_',
      }
    },
    methods: {
        checkLogin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    window.location = 'products.html';
                })
                .catch((error) => {
                    alert(error.response.data.message)
                    window.location = 'login.html';
                })
            },
    },
    mounted() {
        // Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin()
    }
  }).mount('#app');