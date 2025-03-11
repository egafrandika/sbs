<template>
    <div class="login-wrapper">
        <div class="login-left">
            <a-form
                layout="vertical"
                :model="formState"
                name="normal_login"
                class="login-form"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <div class="login-form-pt">PT SAMUDERA BERKAT SHIPPING</div>
                <div class="login-form-title mb-20">Sign in to your account</div>
                <a-form-item
                    label="Email Address"
                    name="username"
                >
                    <a-input
                        v-model:value="formState.username"
                        placeholder="Email Address"
                    >
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="Password"
                    name="password"
                >
                    <a-input-password
                        v-model:value="formState.password"
                        placeholder="Password"
                    >
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                            </a-form-item>
                        <a class="login-form-forgot" href="">Forgot password ?</a>
                </a-form-item>
                <a-form-item>
                    <a-button
                        :disabled="disabled"
                        type="primary"
                        html-type="submit"
                        class="login-form-button"
                        @click="login"
                    >
                        Log in
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="login-right">
            <img src="../../assets/img/login-banner.jpg" alt="logo" class="login-logo" loading="lazy">
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth';
import LoginApi from '/src/common/resource/login.js';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';

export default {
    name: 'Login',

    components: {
        UserOutlined,
        LockOutlined,
    },

    data() {
        return {
            formState: {
                username: '',
                password: '',
                remember: true,
            },
        };
    },

    computed: {
        disabled() {
            return !(this.formState.username && this.formState.password);
        },
    },

    methods: {
        onFinish() {
            console.log('Success');
        },

        onFinishFailed(errorInfo) {
            console.log('Failed:', errorInfo);
        },

        async login() {
            const authStore = useAuthStore();
            const payload =  {
                username: this.formState.username,
                password: this.formState.password
            }
            const response = await LoginApi.login(payload);
            localStorage.setItem('token', response.token);
            localStorage.setItem('isAuthenticated', 'true');
            authStore.setUsername(this.formState.username);
            await this.$router.push({ name: 'Home' });
        }
    }
};
</script>

<style lang="scss" scoped>
    .login-wrapper {
        min-height: 100vh;
        display: flex;
        width: 100%;

        .login-left{
            width: 40%;
        }

        .login-right{
            width: 60%;

            .login-logo{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        @media screen and (max-width: $screen-md) {
            .login-left{
                width: 100%;
            }

            .login-right{
                width: 0%;
            }
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 3.5rem;
        height: 100%;

        .login-form-pt{
            font-size: 14px;
            font-weight: 600;
        }

        .login-form-title{
            font-size: 2rem;
            font-weight: 600;
        }
    }

    .login-form-forgot {
        float: right;
    }
    .login-form-button {
        width: 100%;
    }
</style>
