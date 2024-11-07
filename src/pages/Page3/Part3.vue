<template>
  <CButton @click="sendMessage" color="primary">Send Test Message</CButton>

  <!-- Модальное окно  -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import WebSocketService from "./ws";
import { CButton } from "@coreui/vue";
const showModal = ref(false);
const message = ref("");

let wsService;

const handleIncomingMessage = (msg) => {
  message.value = msg;
  showModal.value = true;
};

const sendMessage = () => {
  if (wsService) {
    wsService.sendMessage("Test message");
  }
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(() => {
  wsService = new WebSocketService("wss:/example.com", handleIncomingMessage);
  wsService.connect();
});

onBeforeUnmount(() => {
  if (wsService) {
    wsService.close();
  }
});
</script>

<style scoped>
/* Стили для модального окна */
.modal {
  display: block; /* Показываем модальное окно */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Фон */
}

.modal-content {
  position: absolute;
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 10px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
