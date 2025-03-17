<template>
    <div class="order-list">
        <a-page-header
            class="page-title mt-20"
            title="Order Create"
        />

        <a-steps :current="current" :items="items" class="mt-30 mb-30"/>

        <!-- Vessel -->
        <a-form
            v-if="current === 0"
            ref="stateRef"
            :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :validate-messages="validateMessages"
            name="nest-messages"
        >
            <a-form-item
                name="vesselId"
                label="Vessel ID"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.vesselId"
                />
            </a-form-item>
            <a-form-item
                name="captainId"
                label="Captain ID"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.captainId"
                />
            </a-form-item>
            <a-form-item
                name="cargo"
                label="Cargo"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.cargo"
                />
            </a-form-item>
            <a-form-item
                name="diesel"
                label="Diesel"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.diesel"
                />
            </a-form-item>
            <a-form-item
                name="meFuelOnBallast"
                label="ME Fuel on Ballast"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.meFuelOnBallast"
                />
            </a-form-item>
            <a-form-item
                name="meFuelOnLaden"
                label="ME Fuel on Laden"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.meFuelOnLaden"
                />
            </a-form-item>
            <a-form-item
                name="aeFuel"
                label="AE Fuel"
                :rules="[{ required: true }]"
            >
                <a-input
                    v-model:value="formState.aeFuel"
                />
            </a-form-item>
            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    @click="submitVessel"
                >
                        Submit
                </a-button>
            </a-form-item>
        </a-form>

        <!-- Seiling -->
        <a-row v-if="current === 1" class="gap-10">
            <a-col :span="isMobile ? 24 : 12">
                <a-form
                    ref="sailingRef"
                    :model="formSailing"
                    :label-col="labelColSailing"
                    :wrapper-col="wrapperColSailing"
                    :validate-messages="validateSailing"
                    name="nest-messages"
                >
                    <a-form-item
                        name="id"
                        label="ID"
                    >
                        <a-input
                            disabled
                            v-model:value="formSailing.id"
                        />
                    </a-form-item>
                    <a-form-item
                        name="originPortId"
                        label="Origin Port ID"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formSailing.originPortId"
                        />
                    </a-form-item>
                    <a-form-item
                        name="originToDestinationSpeed"
                        label="Origin to Destionation Speed"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formSailing.originToDestinationSpeed"
                        />
                    </a-form-item>
                    <a-form-item
                        name="destinationPortId"
                        label="Destination Port ID"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formSailing.destinationPortId"
                        />
                    </a-form-item>
                    <a-form-item
                        name="destinationToOriginSpeed"
                        label="Destination To Origin Speed"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formSailing.destinationToOriginSpeed"
                        />
                    </a-form-item>
                    <a-form-item
                        name="distance"
                        label="Distance"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formSailing.distance"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            @click="onSailing"
                        >
                            Submit
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-col>

            <!-- showing calcualtion -->
            <a-col :span="isMobile ? 24 : 11">
                <div style="display: flex; align-items: center; padding: 0 0 20px;">
                    <div class="title-header"></div>
                    <span>Calculation Result</span>
                </div>
                <a-form>
                    <a-form-item
                        :label-col="labelColSailing"
                        name="originToDestinationDay"
                        label="Origin To Destination Day"
                    >
                        <a-input
                            disabled
                            v-model:value="formSailing.originToDestinationDay"
                        />
                    </a-form-item>
                    <a-form-item
                        :label-col="labelColSailing"
                        name="destinationToOriginDay"
                        label="Destination To Origin Day"
                    >
                        <a-input
                            disabled
                            v-model:value="formSailing.destinationToOriginDay"
                        />
                    </a-form-item>
                    <a-form-item
                        :label-col="labelColSailing"
                        name="totalDistance"
                        label="Total Distance"
                    >
                        <a-input
                            disabled
                            v-model:value="formSailing.totalDistance"
                        />
                    </a-form-item>
                    <a-form-item
                        :label-col="labelColSailing"
                        name="totalSailDay"
                        label="Total Sail Days"
                    >
                        <a-input
                            disabled
                            v-model:value="formSailing.totalSailDay"
                        />
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>

        <!-- port -->
        <a-row v-if="current === 2" class="gap-10">
            <a-col :span="isMobile ? 24 : 12">
                <a-form
                    ref="portRef"
                    :model="formPort"
                    :label-col="labelColSailing"
                    :wrapper-col="wrapperColSailing"
                    :validate-messages="validateSailing"
                    name="nest-messages"
                >
                    <a-form-item
                        name="originIdleDay"
                        label="Origin Idle Day"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formPort.originIdleDay"
                        />
                    </a-form-item>
                    <a-form-item
                        name="originLoadingRate"
                        label="Origin Loading Rate"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formPort.originLoadingRate"
                        />
                    </a-form-item>
                    <a-form-item
                        name="destinationIdleDay"
                        label="Destination Idle Day"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formPort.destinationIdleDay"
                        />
                    </a-form-item>
                    <a-form-item
                        name="destinationDischargeRate"
                        label="Destination Discharge Rate"
                        :rules="[{ required: true }]"
                    >
                        <a-input
                            v-model:value="formPort.destinationDischargeRate"
                        />
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            @click="onPort"
                        >
                            Submit
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-col>

            <!-- showing calcualtion -->
            <a-col :span="isMobile ? 24 : 11">
                <div style="display: flex; align-items: center; padding: 0 0 20px;">
                    <div class="title-header"></div>
                    <span>Calculation Result</span>
                </div>
                <a-form>
                    <a-form-item
                        :label-col="labelColSailing"
                        name="totalWorkingDay"
                        label="Total Working Day"
                    >
                        <a-input
                            disabled
                            v-model:value="formPort.totalWorkingDay"
                        />
                    </a-form-item>
                    <a-form-item
                        :label-col="labelColSailing"
                        name="totalDays"
                        label="Total Days"
                    >
                        <a-input
                            disabled
                            v-model:value="formPort.totalDays"
                        />
                    </a-form-item>
                </a-form>
            </a-col>
        </a-row>
        <div v-if="current === 3">
            <a-table
                bordered
                :scroll="{
                    x: 'max-content'
                }"
                :dataSource="dataBunker"
                :columns="columnsBunker"
                :pagination="false"
                class="mb-30"
            >
                <template #title>
                    Bunker information
                </template>
            </a-table>

            <a-table
                bordered
                :scroll="{
                    x: 'max-content'
                }"
                :dataSource="dataFuelCost"
                :columns="columnsFuelCost"
                :pagination="false"
                class="mb-30"
            >
                <template #title>
                    Fuel Cost information
                </template>
            </a-table>
        </div>

        <a-row
            v-if="current === 4"
            class="gap-10"
        >
            <a-col :span="isMobile ? 24 : 12">
                <a-form
                    ref="disbursementsRef"
                    :model="formDisbursements"
                    :label-col="labelColSailing"
                    :wrapper-col="wrapperColSailing"
                    :validate-messages="validateSailing"
                    name="nest-messages"
                >
                    <a-form-item
                        name="tcCost"
                        label="TC Cost"
                        :rules="[{ required: true }]"
                    >
                        <a-input-number style="width: 100%;" v-model:value="formDisbursements.tcCost"/>
                    </a-form-item>
                    <a-form-item
                        name="initialFreight"
                        label="Initial Freight"
                        :rules="[{ required: true }]"
                    >
                        <a-input v-model:value="formDisbursements.initialFreight"/>
                    </a-form-item>
                    <a-space
                        v-for="(user, key) in formDisbursements.portDisbursements"
                        :key="key"
                        style="display: flex; margin-bottom: 8px; justify-content: flex-end;"
                        align="baseline"
                    >
                        <a-form-item
                            :name="['portDisbursements', key, 'label']"
                            :rules="[{required: true, message: 'Required'}]"
                        >
                            <a-input v-model:value="user.label" placeholder="Masukkan text"/>
                        </a-form-item>

                        <a-form-item
                            :name="['portDisbursements', key, 'value']"
                            :rules="[{required: true, message: 'Required'}]"
                        >
                            <a-input
                                type="number"
                                v-model:value="user.value"
                                placeholder="Masukkan nilai"
                            />
                        </a-form-item>
                        <MinusCircleOutlined @click="removeUser(user)" />
                    </a-space>
                    <a-form-item>
                        <a-button
                            type="dashed"
                            block
                            @click="addUser"
                        >
                            <PlusOutlined />
                            Add More
                        </a-button>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            @click="onDisbursements"
                        >
                            Submit
                        </a-button>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col :span="isMobile ? 24 : 11">
                <a-table
                    bordered
                    :scroll="{
                        x: 'max-content'
                    }"
                    :dataSource="dataDisbursements"
                    :columns="columnsDisbursements"
                    :pagination="false"
                >
                <template #title>
                    Disbursements information
                </template>
            </a-table>
            </a-col>
        </a-row>

        <!-- step -->
        <div class="steps-action">
            <a-button
                v-if="current < steps.length - 1"
                :disabled="onDisabled"
                type="primary"
                @click="next"
            >
                    Next
            </a-button>
            <a-button
                v-if="current == steps.length - 1"
                :disabled="onDisabled"
                type="primary"
                @click="finish"
            >
                Done
            </a-button>
            <a-button
                v-if="current > 0"
                style="margin-left: 8px"
                @click="prev"
            >
                    Previous
            </a-button>
        </div>
    </div>
</template>

<script>

import OrderApi from '../../../common/resource/master-data';
import {isMobileMd} from '../../../common/utils/screen';

const labelCol = {span: 6};
const wrapperCol = { span: 12};
const labelColSailing = {span: 7};
const wrapperColSailing = { span: 24};
const validateMessages =  {
    required: '${label} is required!',
}
const validateSailing =  {
    required: '${label} is required!',
}

export default {
    name: 'OrderCreate',

    data() {
        return {
            isMobile: isMobileMd(),
            recordsData: null,
            current: 4,
            formState: {},
            formSailing: {},
            formPort: {},
            formDisbursements: {
                portDisbursements: []
            },
            vesselSubmitted: false,
            sailingSubmitted: false,
            portSubmitted: false,
            disBursementsSubmitted: false,
            labelCol,
            wrapperCol,
            labelColSailing,
            wrapperColSailing,
            validateMessages,
            validateSailing,
            steps: [
                {
                    title: 'Vessel',
                },
                {
                    title: 'Sailing',
                },
                {
                    title: 'Port',
                },
                {
                    title: 'Bunker',
                },
                {
                    title: 'Port Disbursements',
                },
            ],
            dataBunker: [
                {
                    totalSailDay: null,
                    totalWorkingDay: null,
                    totalMeFuelOnBallast: null,
                    totalMeFuelOnLaden: null,
                    totalAeFuelOnOriginIdle: null,
                    totalAeFuelOnDestinationIdle: null,
                    totalMeFuel: null,
                    totalAeFuel: null
                }
            ],
            columnsBunker: [
                { title: 'Total Sail Day', dataIndex: 'totalSailDay' },
                { title: 'Total Working Day', dataIndex: 'totalWorkingDay'},
                { title: 'Total ME Fuel on Ballast', dataIndex: 'totalMeFuelOnBallast'},
                { title: 'Total ME Fuel on Laden', dataIndex: 'totalMeFuelOnLaden'},
                { title: 'Total AE Fuel on Origin Idle', dataIndex: 'totalAeFuelOnOriginIdle'},
                { title: 'Total AE Fuel on Destination Idle', dataIndex: 'totalAeFuelOnDestinationIdle'},
                { title: 'Total ME Fuel', dataIndex: 'totalMeFuel'},
                { title: 'Total AE Fuel', dataIndex: 'totalAeFuel'}
            ],
            dataFuelCost: [
                {
                    totalMeFuelCostOnBallast: null,
                    totalMeFuelCostOnLaden: null,
                    totalMeFuelCost: null,
                    totalAeFuelCost: null,
                    totalAeFuelCostOnOriginIdle: null,
                    totalAeFuelCostOnOriginLoading: null,
                    totalAeFuelCostOnDestinationIdle: null,
                    totalAeFuelCostOnDestinationDischarge: null,
                    totalFuelCost: null
                }
            ],
            columnsFuelCost: [
                { title: 'Total ME Fuel Cost on Ballast', dataIndex: 'totalMeFuelCostOnBallast' },
                { title: 'Total ME Fuel Cost on Laden', dataIndex: 'totalMeFuelCostOnLaden'},
                { title: 'Total ME Fuel Cost', dataIndex: 'totalMeFuelCost'},
                { title: 'Total AE Fuel Cost', dataIndex: 'totalAeFuelCost'},
                { title: 'Total AE Fuel Cost on Origin Idle', dataIndex: 'totalAeFuelCostOnOriginIdle'},
                { title: 'Total AE Fuel Cost on Origin Loading', dataIndex: 'totalAeFuelCostOnOriginLoading'},
                { title: 'Total AE Fuel Cost on Destination Idle', dataIndex: 'totalAeFuelCostOnDestinationIdle'},
                { title: 'Total AE Fuel Cost on Destination Discharge', dataIndex: 'totalAeFuelCostOnDestinationDischarge'},
                { title: 'Total Fuel Cost', dataIndex: 'totalFuelCost'}
            ],
            dataDisbursements: [
                {
                    portDisbursementsTotal: null,
                    tcCostMonthly: null,
                    totalCost: null,
                    totalBep: null,
                    totalInitialFreight: null,
                    totalInitialMargin: null
                }
            ],
            columnsDisbursements: [
                {title: 'Port Disbursements Total', dataIndex: 'portDisbursementsTotal'},
                {title: 'TC Cost Monthly', dataIndex: 'tcCostMonthly'},
                {title: 'Total Cost', dataIndex: 'totalCost'},
                {title: 'Total Bep', dataIndex: 'totalBep'},
                {title: 'Total Initial Freight', dataIndex: 'totalInitialFreight'},
                {title: 'Total Initial Margin', dataIndex: 'totalInitialMargin'},
            ]
        };
    },

    computed: {
        items() {
            return this.steps.map(item => ({
                key: item.title,
                title: item.title,
            }));
        },

        onDisabled() {
            if (this.current === 0) {
                return !this.vesselSubmitted;
            } else if (this.current === 1) {
                return !this.sailingSubmitted;
            } else if (this.current === 2) {
                return !this.portSubmitted;
            } else if (this.current === 4) {
                return !this.disBursementsSubmitted;
            }
        }
    },

    methods: {
        async submitVessel() {
            const {formState} = this;
            try {
                await this.$refs.stateRef.validate();
                const params = {
                    ...formState,
                    id: this.$route.query.id
                };
                console.log(params);
                const res = await OrderApi.createOrder(params);
                this.formSailing.id = res.id;
                this.$message.success('Vessel Process Success');
                this.vesselSubmitted = true;
            } catch {
                this.$message.error('The field can not be empty!');
            }
        },

        async onSailing() {
            const {formSailing, formState} = this;
            const params = {
                ...formSailing,
                ...formState
            }
            try {
                await this.$refs.sailingRef.validate();
                const res = await OrderApi.createOrder(params);
                Object.assign(this.formSailing, {
                    originToDestinationDay: res.originToDestinationDay,
                    destinationToOriginDay: res.destinationToOriginDay,
                    totalDistance: res.totalDistance,
                    totalSailDay: res.totalSailDay,
                });
                this.$message.success('Sailing Proccess Success')
                this.sailingSubmitted = true;
            } catch {
                this.$message.error('The field can not be empty!');
            }
        },

        async onPort() {
            const {formPort, formSailing, formState} = this;
            const params = {
                ...formPort,
                ...formSailing,
                ...formState
            }
            try {
                await this.$refs.portRef.validate();
                const res = await OrderApi.createOrder(params);
                this.dataBunker = [
                    {
                        totalSailDay: res.totalSailDay,
                        totalWorkingDay: res.totalWorkingDay,
                        totalMeFuelOnBallast: res.totalMeFuelOnBallast,
                        totalMeFuelOnLaden: res.totalMeFuelOnLaden,
                        totalAeFuelOnOriginIdle: res.totalAeFuelOnOriginIdle,
                        totalAeFuelOnDestinationIdle: res.totalAeFuelOnDestinationIdle,
                        totalMeFuel: res.totalMeFuel,
                        totalAeFuel: res.totalAeFuel
                    }
                ];
                this.dataFuelCost = [
                    {
                        totalMeFuelCostOnBallast: res.totalMeFuelCostOnBallast,
                        totalMeFuelCostOnLaden: res.totalMeFuelCostOnLaden,
                        totalMeFuelCost: res.totalMeFuelCost,
                        totalAeFuelCost: res.totalAeFuelCost,
                        totalAeFuelCostOnOriginIdle: res.totalAeFuelCostOnOriginIdle,
                        totalAeFuelCostOnOriginLoading: res.totalAeFuelCostOnOriginLoading,
                        totalAeFuelCostOnDestinationIdle: res.totalAeFuelCostOnDestinationIdle,
                        totalAeFuelCostOnDestinationDischarge: res.totalAeFuelCostOnDestinationDischarge,
                        totalFuelCost: res.totalFuelCost
                    }
                ]
                Object.assign(this.formPort, {
                    totalWorkingDay: res.totalWorkingDay,
                    totalDays: res.totalDays,
                    originIdleDay: res.originIdleDay,
                    originLoadingRate: res.originLoadingRate,
                    destinationIdleDay: res.destinationIdleDay,
                    destinationDischargeRate: res.destinationDischargeRate
                });
                this.$message.success('Port Process Success');
                this.portSubmitted = true;
            } catch {
                this.$message.error('The field can not be empty!');
            }
        },

        async onDisbursements() {
            const {formDisbursements, formPort, formSailing, formState} = this;
            const params = {
                ...formDisbursements,
                ...formPort,
                ...formSailing,
                ...formState
            };
            try {
                await this.$refs.disbursementsRef.validate();
                const res = await OrderApi.createOrder(params);
                this.dataDisbursements = [
                    {
                        portDisbursementsTotal: res.portDisbursementsTotal,
                        tcCostMonthly: res.tcCostMonthly,
                        totalCost: res.totalCost,
                        totalBep: res.totalBep,
                        totalInitialFreight: res.totalInitialFreight,
                        totalInitialMargin: res.totalInitialMargin
                    }
                ]
                this.$message.success('Disbursements Procces Success');
                this.disBursementsSubmitted = true;
            } catch {
                this.$message.error('The field can not be empty!');
            }
        },

        next() {
            this.current++;
        },

        prev() {
            this.current--;
        },

        finish() {
            this.$message.success('Processing complete!');
            this.$router.push({name: 'OrderList'})
        },

        addUser() {
            const label = this.formDisbursements.portDisbursements.label;
            const value = this.formDisbursements.portDisbursements.key;
            this.formDisbursements.portDisbursements.push({
                label: label,
                value: value
            });
        },

        removeUser(user) {
            const index = this.formDisbursements.portDisbursements.indexOf(user);
            if (index !== -1) {
                this.formDisbursements.portDisbursements.splice(index, 1);
            }
        }
    }
};

</script>

<style lang="scss">
    @use '/src/assets/global.scss';

    .order-list {
        display: relative;

        .step {
            margin: 20px 20px;
        }

        .steps-action {
            display: absolute;
            padding: 20px 0;
            bottom: 0;
        }
    }
</style>
