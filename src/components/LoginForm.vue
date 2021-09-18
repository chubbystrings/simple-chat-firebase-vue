<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="email" v-model="email" required />
    <input type="password" placeholder="password" v-model="password" required />
    <div class="error">{{ error }}</div>
    <button :disabled="isLoading" v-if="isLoading">
      <Spinner width="10" height="10" />
    </button>
    <button v-else>Log in</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import useLogin from "../composables/useLogin";
import Spinner from "./ui/Spinner.vue"

export default defineComponent({
  components: {
    Spinner,
  },

  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      isLoading.value = true;
      await login(email.value, password.value);
      if (!error.value) {
        context.emit("login");
      }
      isLoading.value = false;
    };

    return { email, password, handleSubmit, error, isLoading};
  },
});
</script>
<style scoped></style>
