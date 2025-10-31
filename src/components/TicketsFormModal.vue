<template>
  <div class="modal-overlay" style="visibility: visible; opacity: 1">
    <div class="modal-content">
      <div class="card-box">
        <div class="modal-header">
          <h2>{{ isEditing ? "Edit Ticket" : "Create New Ticket" }}</h2>
          <button @click="$emit('close')" class="modal-close">&times;</button>
        </div>
        <form class="modal-form" @submit.prevent="handleSubmit" noValidate>
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              v-model="formData.title"
              required
            />
            <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              rows="4"
              v-model="formData.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="formData.status" required>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="error-message">
              {{ errors.status }}
            </p>
          </div>
          <button type="submit" class="btn btn-primary">Save Ticket</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  ticket: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

const formData = ref({
  title: "",
  description: "",
  status: "open",
});
const errors = ref({});

const isEditing = !!props.ticket;

  if (isEditing) {
    formData.value = { ...props.ticket };
  }
});

const validate = () => {
  const newErrors = {};
  const validStatus = ["open", "in_progress", "closed"];

  if (!formData.value.title.trim()) {
    newErrors.title = "Title is mandatory.";
  }
  if (!formData.value.status) {
    newErrors.status = "Status is mandatory.";
  } else if (!validStatus.includes(formData.value.status)) {
    newErrors.status = "Invalid status value.";
  }
  return newErrors;
};

const handleSubmit = () => {
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors;
    return;
  }
  emit("save", formData.value);
};
</script>
