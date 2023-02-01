import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
    data() {
      return {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        apiPath: 'winter_',
        isNew: false,
        products: [],
        tempProduct: {},
      }
    },
    methods: {
        checkLogin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getData();
                })
                .catch((error) => {
                    alert(error.response.data.message)
                    window.location = 'login.html';
                })
            },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
            axios.get(url)
                .then((response) => {
                    this.products = response.data.products;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
            },
        updateItem(){
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            if (this.isNew) {
                axios.post(url, {data: this.tempProduct})
                .then((response) => {
                    alert(response.data.message);
                    productModal.hide();
                    this.getData();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
            }else{
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                axios.put(url, {data: this.tempProduct})
                .then((response) => {
                    alert(response.data.message);
                    productModal.hide();
                    this.getData();
                })
                .catch((error) => {
                    alert(error.data.message);
                })
            }
            
        },
        deleteItem() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
            .then((response) => {
                alert(response.data.message);
                delProductModal.hide();
                this.getData();
            })
            .catch((error) => {
                alert(error.data.message);
            })
            },
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
            },
        openModal(state, item){
            if (state === 'new'){
                this.tempProduct = {};
                this.isNew = true;
                productModal.show();
            }else if(state === 'edit'){
                this.tempProduct = { ...item };
                this.isNew = false;
                productModal.show();
            }else if(state === 'delete'){
                this.tempProduct = { ...item };
                this.isNew = false;
                delProductModal.show();
            }
            
        }
    },
    mounted() {

        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
          });

        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
          });
        // Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin()
    },
  }).mount('#app');