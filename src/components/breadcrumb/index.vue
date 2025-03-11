<template>
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link v-if="index !== breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.label }}
        </router-link>
        <span v-else>{{ crumb.label }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const route = useRoute();
  
      const breadcrumbs = computed(() => {
        return route.matched
          .filter((match) => match.meta && match.meta.breadcrumb)
          .map((match) => ({
            path: match.path,
            label: match.meta.breadcrumb,
          }));
      });
  
      return { breadcrumbs };
    },
  };
  </script>
  