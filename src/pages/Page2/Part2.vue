<template>
  <div>
    <CButton class="btn btn-primary" type="button" @click="openAddEditModal">
      Добавить элемент
    </CButton>

    <!-- table -->
    <div class="d-flex justify-content-between align-items-center">
      <div @click="sort('code')" class="sortable-column">
        Код
        <span v-if="sortKey === 'code'">
          <span v-if="sortDirection === 'asc'">↑</span>
          <span v-if="sortDirection === 'desc'">↓</span>
        </span>
      </div>
      <div @click="sort('value')" class="sortable-column">
        Значение
        <span v-if="sortKey === 'value'">
          <span v-if="sortDirection === 'asc'">↑</span>
          <span v-if="sortDirection === 'desc'">↓</span>
        </span>
      </div>
      <div>Удалить</div>
    </div>
    <div class="list-group">
      <div
        v-for="item in filteredData"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="{'bg-danger text-white': item.value.includes('red') || item.code.includes('red')}"
        @click="openAddEditModal(item)"
      >
        <div>
          <strong>{{ item.code }}</strong>
        </div>
        <div><strong>{{ item.value }}</strong></div>
        <CButton @click.stop="confirmDelete(item.id)" color="danger">Удалить</CButton>
      </div>
    </div>
    
    <!-- modal redactor -->
    <CModal :visible="isModalOpen" @close="closeModal" title="Редактировать элемент">
      <CModalBody>
        <CForm>
          <CFormLabel>Код</CFormLabel>
          <CFormInput v-model="currentItem.code" />
          <CFormLabel>Значение</CFormLabel>
          <CFormInput v-model="currentItem.value" />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton @click="saveChanges" color="primary">Сохранить</CButton>
        <CButton @click="closeModal" color="secondary">Отмена</CButton>
      </CModalFooter>
    </CModal>

    <!-- modal delete -->
    <CModal :visible="isConfirmDeleteOpen" @close="closeConfirmDelete" title="Подтвердить удаление">
      <CModalBody>Вы уверены, что хотите удалить этот элемент?</CModalBody>
      <CModalFooter>
        <CButton @click="deleteItem" color="secondary">Да</CButton>
        <CButton @click="closeConfirmDelete" color="danger">Нет</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CForm,
} from "@coreui/vue";
import { ref, computed } from "vue";

const data = ref([
  { id: 1, code: "001", value: "Value 1" },
  { id: 2, code: "002", value: "Value 2" },
  { id: 3, code: "003", value: "red Value 3" },
  { id: 4, code: "004", value: "Another value" },
]);

const isModalOpen = ref(false);
const isConfirmDeleteOpen = ref(false);
const currentItem = ref({ code: "", value: "" });
const itemIdToDelete = ref(null);
const searchQuery = ref("");
const sortKey = ref("");
const sortDirection = ref("asc");

const filteredData = computed(() => {
  return data.value
    .filter(item =>
      item.code.includes(searchQuery.value) || item.value.includes(searchQuery.value)
    )
    .sort((a, b) => {
      if (!sortKey.value) return 0;
      const modifier = sortDirection.value === "asc" ? 1 : -1;
      return (a[sortKey.value] < b[sortKey.value] ? -1 : 1) * modifier;
    });
});

const openAddEditModal = (item) => {
  currentItem.value = item ? { ...item } : { code: "", value: "" };
  isModalOpen.value = true;
};

const closeModal = () => {
  currentItem.value = { code: "", value: "" };
  isModalOpen.value = false;
};

const saveChanges = () => {
  if (currentItem.value.id) {
    const index = data.value.findIndex(item => item.id === currentItem.value.id);
    data.value[index] = currentItem.value;
  } else {
    currentItem.value.id = Date.now();
    data.value.push(currentItem.value);
  }
  closeModal();
};

const confirmDelete = (id) => {
  itemIdToDelete.value = id;
  isConfirmDeleteOpen.value = true;
};

const closeConfirmDelete = () => {
  isConfirmDeleteOpen.value = false;
};

const deleteItem = () => {
  data.value = data.value.filter(item => item.id !== itemIdToDelete.value);
  closeConfirmDelete();
};

const sort = (key) => {
  sortDirection.value = sortKey.value === key && sortDirection.value === "asc" ? "desc" : "asc";
  sortKey.value = key;
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
  transition: background-color 0.3s;
}
.list-group-item:hover {
  background-color: #f0f0f0;
}
.text-danger {
  color: red;
}
.sortable-column {
  cursor: pointer;
}
</style>
