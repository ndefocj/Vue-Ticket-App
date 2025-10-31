import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const router = useRouter();

  onMounted(() => {
    const savedToken = localStorage.getItem("ticketapp_session");
    if (savedToken) {
      token.value = savedToken;
    }
  });

  async function login(email, password) {
    try {
      const response = await fetch(
        `multi-framework-ticket-web-app-kam7.vercel.app/users?email=${email}&password=${password}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data.length > 0) {
        const userToken = data[0].token;
        token.value = userToken;
        localStorage.setItem("ticketapp_session", userToken);
        router.push("/dashboard");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  function logout() {
    token.value = null;
    localStorage.removeItem("ticketapp_session");
    router.push("/");
  }

  async function signup(email, password) {
    try {
      const response = await fetch("multi-framework-ticket-web-app-kam7.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          token: `fake-jwt-token-for-${email}`,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  }

  return { token, login, logout, signup };
});
