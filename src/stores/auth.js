import { defineStore } from "pinia";

export const useAuthStore = defineStore("main", {
    state: () => ({
        username: localStorage.getItem("username") || "",
    }),

    actions: {
        setUsername(name) {
            this.username = name;
            localStorage.setItem("username", name);
        },

        logout() {
            this.username = "";
            localStorage.removeItem("username");
        }
    }
});