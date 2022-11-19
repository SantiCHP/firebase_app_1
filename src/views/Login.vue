<template>
  <h1 class="text-center">Login</h1>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        :model="formState"
        name="basicLogin"
        autocomplete="off"
        layout="vertical"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          label="Email"
          :rules="[
            {
              required: true,
              message: 'Debe insertar un email válido',
              whitespace: true,
              type: 'email',
            },
          ]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          name="password"
          label="Password"
          :rules="[
            {
              required: true,
              message: 'Debe insertar password de al menos 6 caracteres',
              min: 6,
              whitespace: true,
            },
          ]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="userStore.loadingUser"
            :disabled="userStore.loadingUser"
            >Acceso
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";

const userStore = useUserStore();

const formState = reactive({
  email: "",
  password: "",
});

const onFinish = async (values) => {
  console.log("Success:", values);
  const error = await userStore.loginUser(formState.email, formState.password);
  if (!error) {
    return message.success("Bienvenidos a la super app 💋");
  }
  switch (error) {
    case "auth/user-not-found":
      message.error("No existe el correo registrado 💋");
      break;
    case "auth/wrong-password":
      message.error("Error de contraseña 💋");
      break;
    default:
      message.error("Ocurrió un error en el servidor 💋 intentelo más tarde...");
      break;
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
