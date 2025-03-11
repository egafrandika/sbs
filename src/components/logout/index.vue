<template>
    <div>
        <a-popover trigger="click" placement="bottomRight">
            <template #content>
                <p class="user">Hi, {{ authStore.username }}</p>
                <a-divider type="horizontal" style="margin: 0;"/>
                <div class="btnWrap">
                    <a class="btn" @click="forgetPassword">FORGET PASSWORD</a>
                    <a class="btn" @click="logout">LOGOUT</a>
                </div>
            </template>
            <user-outlined/>
        </a-popover>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../../stores/auth';
  import { UserOutlined } from '@ant-design/icons-vue';
  
  export default {
    name: 'PopoverComponent',
  
    components: {
      UserOutlined
    },

    setup() {
        const authStore = useAuthStore();
        return {authStore};
    },
  
    methods: {
        forgetPassword() {
            console.log('forget password');
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            this.authStore.logout();
            this.$router.push({ name: 'Login' });
        }
    }
  };
  </script>

<style>
.user {
    font-weight: bold;
    font-size: 15px;
    margin: 10px;
    display: flex;
    justify-content: center;
}

.btn {
    margin: 10px;
}

.btnWrap {
    padding: 8px;
    display: flex;
    flex-direction: column;
}
</style>
  