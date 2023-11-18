<script setup lang="ts">
import {ref} from "vue";

const products = ref([
  {
    id: 1,
    title: "Борщевой набор номер три",
    price: 1000,
    count: 11
  },
  {
    id: 2,
    title: "Борщевой набор номер два",
    price: 1100,
    count: 12
  },
  {
    id: 3,
    title: "Борщевой набор номер один",
    price: 1200,
    count: 13
  }
])
</script>

<template>
  <nav class="navbar">
    <p>Test project</p>
  </nav>
  <div class="container">
    <form class="form-field">
      <div class="input-wrapper">
        <label class="input-label">Выберите продукцию</label>
        <input type="text">
      </div>
      <div class="input-wrapper">
        <label class="input-label">Выберите количество</label>
        <input type="text">
      </div>
      <button class="form-btn" type="submit">Добавить</button>
    </form>

    <ul class="products-list">
      <li class="product-item" v-for="product in products" :key="product.id">
        <p class="product-item-title">{{ product.title }}</p>
        <div class="product-item-descr-wrap">
          <p class="product-item-text">{{ product.count }} шт.</p>
          <p class="product-item-text">{{ product.price }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>