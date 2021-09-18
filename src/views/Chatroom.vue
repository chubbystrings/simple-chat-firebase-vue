<template>
  <div class="container">
    <Navbar />
    <ChatWindow />
    <NewChatForm />
  </div>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
import Navbar from "../components/Navbar.vue";
import NewChatForm from '../components/NewChatForm.vue';
import ChatWindow from '../components/ChatWindow.vue'
import useGetCurrentUser from "../composables/useGetCurrentUser";
import { useRouter } from "vue-router";
import Backdrop from '../components/ui/Backdrop.vue';
import Spinner from '../components/ui/Spinner.vue'

export default defineComponent({
  components: {
    Navbar,
    NewChatForm,
    ChatWindow,
    Backdrop,
    Spinner,
  },
  setup() {
    const router = useRouter();
    const { user } = useGetCurrentUser();
    watch( user, () => {
        console.log(user)
      if (!user.value) {
        router.replace({ name: "Welcome" });
      }
    });

    return { user }
  },
});
</script>
<style scoped></style>
