import { customPost, customGet } from '/src/services/axios';

const vessel = async (payload) => {
    return customPost('/api/vessel', payload);
}

const vesselEdit = async (payload) => {
    return customPost(`/vessel/${payload.id}`, payload);
}

const getVessel = async (payload) => {
    return customGet('/api/vessel/list', payload);
}

const createOrder = async (payload) => {
    return customPost('/api/order/create', payload);
}

const createList = async (payload) => {
    return customGet('/api/order/list', payload);
}

const init = async (payload) => {
    return customPost('/api/order/init', payload);
}

const byId = async (payload) => {
    return customGet(`/api/order/byId?orderId=${payload}`, payload);
}

export default {
    vessel,
    getVessel,
    vesselEdit,
    createOrder,
    createList,
    init,
    byId
};
