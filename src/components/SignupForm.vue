<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="display name"
      v-model="displayName"
      required
    />
    <input type="email" placeholder="email" v-model="email" required />
    <input type="password" placeholder="password" v-model="password" required />
    <div class="error">{{ error }}</div>
    <button>Sign Up</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import useSignup from "../composables/useSignup";

export default defineComponent({
  setup(props, context) {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const { error, signup } = useSignup();
    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        context.emit("signup");
      }
    };

    return { email, password, displayName, handleSubmit, error };
  },
});
</script>
<style scoped></style>
