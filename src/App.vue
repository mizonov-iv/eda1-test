<script setup lang="ts">
import {ref} from "vue";
import {useOrdersStore} from "./stores/OrdersStore";

const ordersStore = useOrdersStore();
ordersStore.getProductsList()

const selectedProduct = ref();
const productCount = ref();

const selectedProducts = ref([]);

function handleSelect () {

  const newProduct = {
    ...selectedProduct.value,
    count: productCount.value
  }

  selectedProducts.value.push(newProduct)

  selectedProduct.value = '';
  productCount.value = '';
}

</script>

<template>
  <nav class="navbar">
    <p>Test project</p>
  </nav>
  <div class="container">
    <form class="form-field" @submit.prevent="handleSelect">
      <div class="input-wrapper">
        <label class="input-label">Выберите продукцию</label>
        <select class="form-input" v-model="selectedProduct">
          <option :value="item" v-for="item in ordersStore.productsList" :key="item.id">
            {{item.title}}
          </option>
        </select>
      </div>
      <div class="input-wrapper">
        <label class="input-label">Выберите количество</label>
        <input class="form-input" type="text" v-model="productCount">
      </div>
      <button class="form-btn" type="submit">Добавить</button>
    </form>

    <ul class="products-list" v-if="selectedProducts.length">
      <li class="product-item" v-for="product in selectedProducts" :key="product.id">
        <p class="product-item-title">{{ product.title }}</p>
        <div class="product-item-descr-wrap">
          <p class="product-item-text">{{ product.count }} шт.</p>
          <p class="product-item-text">{{ product.price }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>