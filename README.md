# Vue.js: Ticket Management App

This is the Vue.js implementation of the Ticket App, built with the Composition API.

## Tech Stack

* **Framework:** Vue 3 (`<script setup>`)
* **Bundler:** Vite
* **Routing:** Vue Router 4
* **State Management:** Pinia
* **Notifications:** Vue Toastification
* **API Calls:** `fetch` API

## Project Structure

* `src/store/auth.js`: The Pinia store that manages global auth state (token, login, logout) and persists the session to `localStorage`.
* `src/router/index.js`: Defines all routes and uses a `router.beforeEach` navigation guard to protect routes that have the `meta: { requiresAuth: true }` flag.
* `src/pages/`: Contains all main page components (Landing, Auth, Dashboard, Tickets).
* `src/components/TicketFormModal.vue`: The reusable modal component for both creating and editing tickets.

## Test User

* **Email:** `test@example.com`
* **Password:** `password123`