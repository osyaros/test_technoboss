<template>
  <div>
    <CButton class="btn btn-primary" type="button" @click="openAddEditModal">
      Добавить элемент
    </CButton>
    <CTable class="table table-hover">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell @click="sort('code')">Код</CTableHeaderCell>
          <CTableHeaderCell @click="sort('value')">Значение</CTableHeaderCell>
          <CTableHeaderCell>Удалить</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow
          v-for="item in filteredData"
          :key="item.id"
          :color="item.value.includes('red') || item.code.includes('red') ? 'danger' : undefined"
          @click="openAddEditModal(item)"
        >
          <CTableDataCell>{{ item.code }}</CTableDataCell>
          <CTableDataCell>{{ item.value }}</CTableDataCell>
          <CTableDataCell>
            <CButton @click.stop="confirmDelete(item.id)" color="danger">Удалить</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

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
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
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
.text-danger {
  color: red; /* Задаем красный цвет для текста */
}
</style>