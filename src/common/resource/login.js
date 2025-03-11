import { customPost } from '/src/services/axios';

const login = async (payload) => {
    return customPost('/api/auth/login', payload)
}

export default {
    login
};