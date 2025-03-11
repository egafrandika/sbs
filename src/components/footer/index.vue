<template>
    <a-layout-footer :style="{ textAlign: 'center' }">
      PT SAMUDERA BERKAT SHIPPING ©{{ currentYear }}
    </a-layout-footer>
  </template>

  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    }
  };
  </script>
