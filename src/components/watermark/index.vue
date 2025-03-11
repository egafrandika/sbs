<template>
    <a-watermark 
        :content="watermarkContent" 
        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;"
    >
        <div style=" position: absolute; z-index: 1;" />
    </a-watermark>
</template>

<script>
import { useAuthStore } from '../../stores/auth';
import { ref } from 'vue';

export default {
  setup() {
    const authStore = useAuthStore();
    const watermarkContent = ref(authStore.username);

    const updateWatermarkContent = (newContent) => {
      watermarkContent.value = newContent;
    };

    return { watermarkContent, updateWatermarkContent };
  },
};
</script>
