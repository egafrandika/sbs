<template>
    <div class="order-list-page">
        <a-page-header
            class="page-title mt-20"
            title="Order List"
        />

        <a-button
            :loading="loading"
            type="primary"
            class="mt-20 mb-20"
            @click="onCreateList"
        >
            Create List
        </a-button>
        <a-table
            :size="tableSize"
            :scroll="{ x: 'max-content' }"
            :dataSource="orderList"
            tableLayout="auto"
            :columns="columns"
            bordered
        >
            <template #bodyCell="{ column, record: {id}}">
                <template v-if="column.key === 'operation'">
                    <a-button
                        type="primary"
                        size="small"
                        @click="onDetail(id)"
                    >
                        Show Detail
                    </a-button>
                </template>
            </template>
        </a-table>
        <a-modal
            v-model:open="open"
            width="100%"
            wrap-class-name="full-modal"
            footer=""
        >
            <a-descriptions
                bordered
                title="Order Detail"
                size="small"
            >
                <a-descriptions-item
                    v-for="(data, idx) in dataById"
                    :key="idx"
                    :label="getLabel(idx) || idx"
                >
                    <template v-if="idx === 'portDisbursementsMap'">
                        <div v-for="(amount, item) in data" :key="item">
                            <span>{{ item }}:</span> {{formatAmountIdr(amount)}}
                        </div>
                    </template>

                    <template v-else>
                        {{ formatText(idx, data) }}
                    </template>
                </a-descriptions-item>
            </a-descriptions>
        </a-modal>
    </div>
</template>
<script>

import OrderApi from '../../../common/resource/master-data';
import {orderColumns, detailColumns} from './constant/fields';
import {formatAmountIdr} from '../../../common/utils/format';

export default {
    name: 'OrderList',

    data() {
        return {
            dataById: null,
            open: false,
            loading: false,
            orderList: null,
            totalPages: null,
            size: null,
            columns: orderColumns,
            detailColumns: detailColumns,
        }
    },

    computed: {
        tableSize() {
          const isMobile = window.innerWidth <= 768;
          return isMobile ? 'small' : 'large';
        }
    },

    mounted() {
        this.getData();
    },

    methods: {
      formatAmountIdr,
        async getData() {
            const {totalPages, size, content} = await OrderApi.createList();
            this.orderList = content;
            this.pagination = {
                current: size,
                total: totalPages
            };
        },

        async onCreateList() {
            if (this.loading) return;
            this.loading = true;
            setTimeout(async () => {
                this.loading = false;
                const res = await OrderApi.init();
                this.$router.push({name: 'OrderCreate', query: {id: res.id}});
            }, 3000);
        },

        async onDetail(id) {
            this.open = true;
            const res = await OrderApi.byId(id);
            this.dataById = res;
        },

        getLabel(idx) {
            return this.detailColumns?.find(item => item.dataIndex === idx)?.title || null;
        },

        formatText(idx, value) {
            return this.detailColumns.find(col => col.dataIndex === idx)?.customRender?.({ text: value }) ?? value;
        }
    }
}

</script>

<style lang="scss" scoped>
@use '/src/assets/global.scss';
</style>
