<template>
    <a-space direction="vertical">
        <a-cascader
            v-model:value="value"
            :options="options"
            :show-search="{ filter }"
            placeholder="Search Page"
            @change="onChangePage"
        />
    </a-space>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
    name: 'SearchBar',

    data() {
        return {
            value: [],
        }
    },

    setup() {
        const router = useRouter();

        return {router};
    },

    computed: {
        options() {
            return this.flattenRoutes(this.$router.options.routes);
        },
    },
    
    methods: {
        flattenRoutes(routes, parentLabel = '') {
            return routes.reduce((acc, route) => {
                if (route.meta?.hidden) return acc;
                
                const label = parentLabel ? `${parentLabel} > ${route.meta?.label || ''}` : route.meta?.label;
                if (route.meta?.label) {
                    acc.push({ value: route.name, label });
                }
                
                if (route.children) {
                    acc.push(...this.flattenRoutes(route.children, label));
                }
                return acc;
            }, []);
        },

        onChangePage(selectedVal) {
            if (selectedVal && selectedVal.length > 0) {
                this.router.push({name: selectedVal[0]})
            }
        },

        filter(inputValue, path) {
            return path.some(option => option.label?.toLowerCase().includes(inputValue.toLowerCase()));
        },
    }
}
</script>