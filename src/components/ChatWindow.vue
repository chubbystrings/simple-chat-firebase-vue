<template>
<backdrop v-if="!documents">
  <Spinner />
</backdrop>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "vue";
import useGetCollection from "../composables/useGetCollection";
import { formatDistanceToNow } from "date-fns";
import Backdrop from "../components/ui/Backdrop.vue";
import Spinner from "../components/ui/Spinner.vue";

export default defineComponent({
  components: {
    Backdrop,
    Spinner,
  },
  setup() {
    const { error, documents } = useGetCollection("messages");

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

    const messages = ref<HTMLDivElement | null>(null);

    onUpdated(() => {
      if (messages.value) {
        messages.value.scrollTop = messages.value.scrollHeight;
      }
    });

    return { error, documents, formattedDocuments, messages };
  },
});
</script>
<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
