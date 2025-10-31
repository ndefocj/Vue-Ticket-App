<template>
  <main class="auth-container">
    <div class="auth-form card-box">
      <h1>{{ isLogin ? "Welcome Back" : "Create Account" }}</h1>
      <form @submit.prevent="handleSubmit" noValidate>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required />
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
          />
          <p v-if="errors.password" class="error-message">
            {{ errors.password }}
          </p>
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isLogin ? "Login" : "Sign Up" }}
        </button>
      </form>
      <p class="auth-toggle">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <a href="#" @click.prevent="isLogin = !isLogin">
          {{ isLogin ? " Sign Up" : " Login" }}
        </a>
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth.js";
import { useToast } from "vue-toastification";

const isLogin = ref(true);
const formData = ref({ email: "", password: "" });
const errors = ref({});

const authStore = useAuthStore();
const toast = useToast();

const validate = () => {
  const newErrors = {};
  if (!formData.value.email) newErrors.email = "Email is required";
  if (!formData.value.password) newErrors.password = "Password is required";
  return newErrors;
};

const handleSubmit = async () => {
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors;
    return;
  }
  errors.value = {};

  if (isLogin.value) {
    const success = await authStore.login(
      formData.value.email,
      formData.value.password
    );
    if (success) {
      toast.success("Logged in successfully!");
    } else {
      toast.error("Login Failed. Check your email and password.");
    }
  } else {
    const success = await authStore.signup(
      formData.value.email,
      formData.value.password
    );
    if (success) {
      toast.success("Signup successful! Please log in.");
      isLogin.value = true;
      formData.value.password = "";
    } else {
      toast.error("Signup failed. This email might already be taken.");
    }
  }
};
</script>
