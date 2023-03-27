<template>
  <div class="wrapper">
    <!--  NAVBAR-->
    <div class="navbar">
      <a class="navbar__logo" href="#">sf</a>
    </div>

    <main class="main">
      <!--  ORDER LIST-->
      <div class="order-list__wrapper">
        <form class="form">
          <label class="form__label" for="select">Выберите продукцию</label>
          <select class="form__select" id="select" v-model="selectedOption" @change="selectProduct($event.target.value)">
            <option v-for="(option, index) in options" :key="index">{{option.title}}</option>
          </select>
          <label class="form-label" for="input">Выберите количество</label>
          <input class="form__input" type="text" id="input" v-model="quantity">
          <button class="form__btn" @click.prevent="addOrder">Добавить</button>
        </form>
        <div class="order-list">
          <table>
            <thead class="table-head">
            <tr>
              <th>Название товара</th>
              <th>Количество</th>
              <th>Стоимость</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{order.selectedOption}}</td>
              <td>{{order.quantity}}</td>
              <td>{{order.price}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="save__wrapper">
        <div>border</div>
        <div>итого:</div>
        <button class="save-btn" @click.prevent="saveOrdersList">Сохранить</button>
      </div>
    </main>

    <!--  FOOTER-->
    <div class="footer">
      <a class="footer__link" href="#">Very intresting tail</a>
    </div>
  </div>

  <!--    SUCCESS MOdAL-->
  <div v-if="showSuccess">
    <p>{{productInOrder.product_id}}</p>
    <p>{{productInOrder.quantity}}</p>
  </div>
</template>

<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";

const options = ref([]);

const selectedOption = ref("");
const quantity = ref("");
const price = ref("");

const orders = ref([]);
const productInOrder = ref({product_id: "", quantity: ""})

const showSuccess = ref(false)

onMounted(() => {
  getProducts();
});

const getProducts = () => {
  axios.get("https://dev-su.eda1.ru/test_task/products.php")
      .then(response => {
        if(response.status === 200) {
          options.value = response.data.products
          console.log(options.value)
        }
      })
      .catch(error => {
        console.log(error)
      })
}

const selectProduct = (order) => {
  selectedOption.value = order
  // price.value = order
  console.log(selectedOption.value)
}

const addOrder = () => {
  let newOrder = {
    selectedOption: selectedOption.value,
    quantity: quantity.value,
  }
  orders.value.push(newOrder)
}

const saveOrdersList = () => {
  axios.post("https://dev-su.eda1.ru/test_task/save.php", orders.value)
      .then(response => {
        if(response.status === 200) {
          productInOrder.product_id.value = response.data.product_id
          productInOrder.quantity.value = response.data.quantity

          showSuccess.value = true
        }
      })
      .catch(error => {
        console.log(error)
      })
}

</script>