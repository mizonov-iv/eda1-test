import {defineStore} from "pinia";
import axios from "axios";

export const useOrdersStore = defineStore('ordersStore', {
    state: () => ({
        productsList: []
    }),
    actions: {
        getProductsList() {
            axios.get("https://dev-su.eda1.ru/test_task/products.php")
                .then(response => {
                    // console.log(response)
                    this.productsList = response.data.products
                })
        }
    }
})