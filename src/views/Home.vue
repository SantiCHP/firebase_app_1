<template>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese el URL" v-model="url" />
      <button type="submit">Agregar</button>
    </form>
    <p v-if="databaseStore.loadingDocs">Loading documents...</p>
    <ul v-else>
      <li v-for="item of databaseStore.documents" :key="item.id">
        <span><strong>ID: </strong></span>{{ item.id }}
        <br />
        <span><strong>URL: </strong></span>{{ item.name }}
        <br />
        <span><strong>Short: </strong></span>{{ item.short }}
        <br />
        <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
        <button @click="router.push(`/editar/${item.id}`)">Editar</button>
        <br />
        <br />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

databaseStore.getUrls();

const url = ref("");

const handleSubmit = () => {
  // Validaciones de la URL
  databaseStore.addUrl(url.value);
};
</script>
