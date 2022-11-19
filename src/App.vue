<template>
  <a-layout>
    <a-layout-header
      class="card-shadow"
      :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
      v-if="!userStore.loadingSession"
    >
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        v-model:selectedKeys="selectedKeys"
      >
        <a-menu-item key="home" v-if="userStore.userData">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="login" v-if="!userStore.userData">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.userData">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item key="logout" @click="userStore.logoutUser" v-if="userStore.userData">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <div v-if="userStore.loadingSession">Loading user...</div>
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "./stores/user";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const selectedKeys = ref([]);

//console.log(route.name);
watch(
  () => route.name,
  () => (selectedKeys.value = [route.name])
);
</script>

<style>
.container {
  background-color: #fff;
  padding: 24xp;
  min-height: calc(100vh);
}
.text-center {
  text-align: center;
  padding-top: 80px;
}
.horizontal-padding-sm {
  padding: 0 15px;
}
.card-shadow {
  -webkit-box-shadow: 2px 3px 5px 2px rgba(163, 163, 163, 0.56);
  -moz-box-shadow: 2px 3px 5px 2px rgba(163, 163, 163, 0.56);
  box-shadow: 2px 3px 5px 2px rgba(163, 163, 163, 0.56);
}
</style>
