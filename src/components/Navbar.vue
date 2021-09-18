<template>
  <nav v-if="user">
    <div>
      <p>{{ user.displayName }}</p>
      <p class="email">{{ user.email }}</p>
    </div>
    <div>
      <button @click="handleClick">Logout</button>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useLogout from "../composables/useLogout";
import { useRouter } from "vue-router";
import useGetCurrentUser from '../composables/useGetCurrentUser';

export default defineComponent({
  setup() {
    const { error, logout } = useLogout();
    const router = useRouter();
    const { user } = useGetCurrentUser();
    console.log(user.value)

    const handleClick = async () => {
      await logout();
    //   if (!error.value) {
    //     router.push({ name: "Welcome" });
    //   }
    };

    return { error, handleClick, user };
  },
});
</script>
<style scoped>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
