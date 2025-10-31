<template>
  <div class="card-box ticket-card">
    <div class="ticket-header">
      <h3>{{ ticket.title }}</h3>
      <p class="ticket-id">#TKT-00{{ ticket.id }}</p>
    </div>
    <p class="ticket-desc">{{ ticket.description }}</p>
    <div class="ticket-footer">
      <span :class="statusClass">{{ ticket.status.replace("_", " ") }}</span>
      <div class="ticket-actions">
        <a href="#" @click.prevent="onEdit">Edit</a>
        <button @click="onDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  ticket: {
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const statusClass = computed(() => {
  return `status-tag status-${props.ticket.status.toLowerCase()}`;
});

const onEdit = () => {
  emit("edit", props.ticket);
};
const onDelete = () => {
  emit("delete", props.ticket.id);
};
</script>
