<template>
  <div>
    <h1>Editar id: router.params</h1>
    <p v-if="databaseStore.loadingDocs">Loading url...</p>
    <form @submit.prevent="handleSubmit" v-else>
      <input type="text" placeholder="Ingrese el URL" v-model="url" />
      <button type="submit">Editar</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";

const databaseStore = useDatabaseStore();
const route = useRoute();

const handleSubmit = () => {
  // Validaciones de formulario
  databaseStore.updateUrl(route.params.id, url.value);
};

const url = ref("");

onMounted(async () => {
  url.value = await databaseStore.leerUrl(route.params.id);
});
</script>
