<template>
  <form>
    <textarea
      placeholder="Type message"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import useGetCurrentUser from "../composables/useGetCurrentUser";
import { serverTimestamp } from "../firebase/config";
import useAddToCollection from "../composables/useAddToCollection";

export default defineComponent({
  setup() {
    const message = ref("");
    const { user } = useGetCurrentUser();
    const { error, addDocument } = useAddToCollection("messages");

    const handleSubmit = async () => {
      const chat = {
        name: user.value?.displayName,
        userId: user.value?.uid,
        message: message.value,
        createdAt: serverTimestamp(),
      };

      await addDocument(chat);
      console.log(error)
      if (!error.value) {
        message.value = "";
      }
    };

    return { handleSubmit, message, error };
  },
});
</script>
<style scoped>
form {
  margin: 10px;
}

textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
