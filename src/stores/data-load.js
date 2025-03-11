import { defineStore } from "pinia";

export const useLoadingState = defineStore("loading", {
    state: () => ({
        isLoading: false
    }),

    actions: {
        startLoading() {
            this.isLoading = true;
        },

        stopLoading() {
            this.isLoading = false;
        }
    }
})