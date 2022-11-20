<template>
  <h1 class="text-center">Perfil de usuario</h1>
  <div class="position-center">
    <a-avatar :size="100" :src="userStore.userData.photoURL"></a-avatar>
    <p style="margin-top: 15px">
      <b>{{ userStore.userData.displayName }}</b>
    </p>
  </div>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        :model="userStore.userData"
        name="basicPerfil"
        autocomplete="off"
        layout="vertical"
        @finish="onFinish"
      >
        <a-form-item
          name="email"
          label="Su email"
          :rules="[
            {
              required: true,
              message: 'Debe insertar un email válido',
              whitespace: true,
              type: 'email',
            },
          ]"
        >
          <a-input disabled v-model:value="userStore.userData.email" />
        </a-form-item>
        <a-form-item
          name="displayName"
          label="Nick Name"
          :rules="[
            {
              required: true,
              message: 'Debe insertar un Nick Name',
              whitespace: true,
            },
          ]"
        >
          <a-input v-model:value="userStore.userData.displayName" />
        </a-form-item>
        <a-upload
          v-model:file-list="fileList"
          :before-upload="beforeUpload"
          list-type="picture"
          @change="handleChange"
        >
          <a-button class="mb-5">Subir imagen de avatar</a-button>
        </a-upload>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="userStore.loadingUser"
            :disabled="userStore.loadingUser"
            >Actualizar datos
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";
import { ref } from "vue";

const userStore = useUserStore();
const fileList = ref([]);

const beforeUpload = (file) => {
  fileList.value = [...fileList.value, file];
  return false;
};

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    const isJpgOrPng = info.file.type === "image/jpeg" || info.file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Solo pueses subir imágenes JPG o PNG");
      handleRemove(info.file);
      return;
    }
    const isLt2M = info.file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("La imagen debe ocupar menos de 2MB");
      handleRemove(info.file);
      return;
    }
  }

  let resFileList = [...info.fileList];
  resFileList = resFileList.slice(-1);
  resFileList = resFileList.map((file) => {
    if (file.response) {
      file.url = file.response.url;
    }
    return file;
  });
  fileList.value = resFileList;
};

const onFinish = async () => {
  const error = await userStore.updateUser(userStore.userData.displayName);

  if (fileList.value[0]) {
    const error = await userStore.updateImg(fileList.value[0]);
    if (error) {
      return message.error("Ha surgido algún problema al subir tu imagen 💋");
    }
    message.success("Se ha actualizado tu imagen 💋");
  }

  if (!error) {
    return message.success("Perfil actualizado (displayName) 💋");
  }
  switch (error) {
    default:
      message.error(
        "Ocurrió un error al actualizar los datos del perfil (displayName) 💋"
      );
      break;
  }
};
</script>
<style>
.mb-5 {
  margin-bottom: 2rem;
}
</style>
