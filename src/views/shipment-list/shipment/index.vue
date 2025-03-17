<template>
    <div class="shipment-list">
        <a-page-header
            class="page-title mt-20"
            title="Vessel List"
        />
        <a-form
            ref="formRef"
            class="mt-20"
            layout="inline"
            :model="formState"
        >
            <a-form-item
                label="Tipe"
            >
                <a-input
                    v-model:value="formState.type"
                    placeholder="input placeholder"
                />
            </a-form-item>
            <a-form-item
                label="Nama"
            >
                <a-input
                    v-model:value="formState.name"
                    placeholder="input placeholder"
                />
            </a-form-item>
            <a-form-item
                label="Kapasitas"
            >
                <a-input
                    v-model:value="formState.capacity"
                    placeholder="input placeholder"
                />
            </a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                @click="handleSearch"
            >
                Search
            </a-button>
            <a-button
                style="margin: 0 8px"
                @click="resetForm"
            >
                    Clear
            </a-button>
        </a-form>
        <a-row class="mt-20 mb-20" justify="end">
            <div>
                <a-button
                    type="primary"
                    class="editable-add-btn"
                    @click="openAddModal"
                >
                    <plus-outlined />
                        Penambahan
                </a-button>
                <a-modal
                    v-model:open="onAdd"
                    title="Buat Daftar Kapal"
                >
                    <template #footer>
                        <a-button
                            key="back"
                            @click="closeAddModal"
                        >
                            Close
                        </a-button>
                        <a-button
                            key="submit"
                            type="primary"
                            html-type="submit"
                            @click="handleOk"
                        >
                            Confirm
                        </a-button>
                    </template>
                    <a-form
                        class="mt-20"
                        layout="vertical"
                        :model="modalState"
                        name="dynamic_rule"
                        @finish="handleOk"
                    >
                        <a-form-item
                            label="Tipe"
                            name="type"
                            :rules="[{required: true,  message: 'Harapan masukan tipe!'}]"
                        >
                            <a-input
                                v-model:value="modalState.type"
                                placeholder="Masukan tipe kapal"
                            />
                        </a-form-item>
                        <a-form-item
                            label="Nama"
                            name="name"
                            :rules="[{required: true, message: 'Masukan nama kapal'}]"
                        >
                            <a-input
                                v-model:value="modalState.name"
                                placeholder="Masukan nama kapal"
                            />
                        </a-form-item>
                        <a-form-item
                            label="Kapasitas"
                            name="capacity"
                            :rules="[{required: true, message: 'Masukan kapasitas kapal'}]"
                        >
                            <a-input
                                v-model:value="modalState.capacity"
                                placeholder="Masukan kapasitas kapal"
                            />
                        </a-form-item>
                    </a-form>
                </a-modal>
                <a-modal
                    v-model:open="editModal"
                    title="Edit Modal"
                    @ok="editConfirmModal"
                >
                    <a-form
                        layout="vertical"
                        :model="formEditModal"
                    >
                        <a-form-item
                            label="Tipe"
                            name="formEditModal.type"
                            :rules="[{required: true, message: 'Masukan tipe kapal'}]"
                        >
                            <a-input
                                v-model:value="formEditModal.type"
                                placeholder="Masukan tipe kapal"
                            />
                        </a-form-item>
                        <a-form-item
                            label="Nama"
                            name="formEditModal.name"
                            :rules="[{required: true, message: 'Masukan nama kapal'}]"
                        >
                            <a-input
                                v-model:value="formEditModal.name"
                                placeholder="Masukan tipe kapal"
                            />
                        </a-form-item>
                        <a-form-item
                            label="Kapasitas"
                            name="formEditModal.capacity"
                            :rules="[{required: true, message: 'Masukan kapasitas kapal'}]"
                        >
                            <a-input
                                v-model:value="formEditModal.capacity"
                                placeholder="Masukan tipe kapal"
                            />
                        </a-form-item>
                        <a-form-item
                            label="Status"
                            name="formEditModal.status"
                            :rules="[{required: true, message: 'Masukan status kapal'}]"
                        >
                            <a-select
                                v-model:value="formEditModal.status"
                                placeholder="masukan status"
                            >
                                <a-select-option
                                    v-for="option in statusOptions"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-modal>
            </div>
        </a-row>
        <a-table
            class="mt-20 mb-20"
            :columns="vesselTitle"
            :dataSource="vesselData"
            bordered
        >
            <template #bodyCell="{column, record}">
                <template v-if="column.key === 'operator'">
                    <a-button
                        type="primary"
                        @click="editRow(record)"
                    >
                        Edit
                    </a-button>
                </template>
                <template v-if="column.key === 'status'">
                    <a-space direction="vertical">
                        <a-switch
                            v-model:checked="record.status"
                            checked-children="Enable"
                            un-checked-children="Disable"
                            @change="toggleStatus(record)"
                        />
                    </a-space>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script>

import Vessel from '/src/common/resource/master-data.js';

export default {
    name: 'VesselList',

    data() {
        return {
            formEditModal: {
                id: '',
                type: '',
                name: '',
                capacity: '',
                status: '',
            },
            statusOptions: [
                { label: 'Enable', value: 'true' },
                { label: 'Disable', value: 'false' }
            ],
            editModal: false,
            onAdd: false,
            formState: {
                type: '',
                name: '',
                capacity: ''
            },
            modalState: {
                type: '',
                name: '',
                capacity: ''
            },
            vesselData: [],
            vesselTitle: []
        }
    },

    mounted() {
        this.vesselList();
    },

    methods: {
        async handleSearch() {
            await this.vesselList();
        },

        async vesselList() {
            const {tableData, tableTitle} =  await Vessel.getVessel();

            this.vesselTitle = tableTitle.map(col => ({
                title: col.name,
                dataIndex: col.value,
                key: col.value
            }));

            this.vesselTitle.push({
                title: 'Action',
                key: 'operator'
            })

            this.vesselData = tableData.filter(item => {
                const {type, name, capacity} = this.formState;

                return (
                    (!type || item.type?.toLowerCase().includes(type.toLowerCase())) &&
                    (!name || item.name?.toLowerCase().includes(name.toLowerCase())) &&
                    (!capacity || String(item.capacity).includes(capacity))
                )
            });
        },

        openAddModal() {
            this.onAdd = true;
        },

        closeAddModal() {
            this.onAdd = false;
            this.vesselList();
        },

        resetForm() {
            this.formState = {
                type: '',
                name: '',
                capacity: ''
            }
        },

        async handleOk() {
            const payload = {
                type: this.modalState.type,
                name: this.modalState.name,
                capacity: this.modalState.capacity
            }
            await Vessel.vessel(payload);
            this.closeAddModal();
        },

        editRow(record) {
            const {id, type, name, capacity, status} = record;
            this.formEditModal.id = id;
            this.formEditModal.type = type;
            this.formEditModal.name = name;
            this.formEditModal.capacity = capacity;
            this.formEditModal.status = status ? 'true' : 'false';
            this.editModal = true;
        },

        async editConfirmModal() {
            const {id, type, name, capacity, status} = this.formEditModal;
            const params = {id, type, name, capacity, status}
            await Vessel.vesselEdit(params);
            this.editModal = false;
            this.vesselList();
        },

        async toggleStatus(record) {
            await Vessel.vesselEdit(record);
            this.vesselList();
        }
    }
}
</script>
<style lang="scss" scoped>
@use '/src/assets/global.scss';
</style>
