<template>
  <a-layout v-if="isAuthenticated">
    <a-layout-sider
        :style="{display: isMobileMd ? 'none' : '' }"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
    >
        <div class="logo">
            SBS
        </div>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            theme="dark"
            mode="inline"
        >
            <template
                v-for="item in menuItems"
            >
                <a-sub-menu
                    v-if="item.children"
                    :key="item.path"
                >
                    <template #title>
                        <component :is="item.icon" />
                        <span>{{ item.label }}</span>
                    </template>

                    <a-menu-item
                        v-for="child in item.children"
                        :key="child.path"
                    >
                        <router-link :to="child.path">
                            <component :is="child.icon" />
                            <span>{{ child.label }}</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item
                    v-else
                    :key="item.index"
                >
                    <router-link :to="item.path">
                        <component :is="item.icon" />
                        <span>{{ item.label }}</span>
                    </router-link>
                </a-menu-item>
            </template>
        </a-menu>
    </a-layout-sider>

    <a-layout>
        <a-layout-header
            style="background: #fff;
            padding: 0; z-index: 10;
            display: flex;
            justify-content: space-between;"
        >
        <div style="display: flex; align-items: center; text-align: center">
            <menu-unfold-outlined
                :style="{display: isMobileMd ? 'none' : '' }"
                v-if="collapsed"
                class="trigger"
                @click="toggleCollapsed"
            />
            <menu-fold-outlined
                :style="{display: isMobileMd ? 'none' : '' }"
                v-else
                class="trigger"
                @click="toggleCollapsed"
            />
            <SearchBar />
        </div>
              <BtnUser class="btnUser"/>
        </a-layout-header>
            <a-layout-content
              :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
            >
                <Breadcrumb class="breadcrumb"/>
                <a-spin v-if="useLoading.isLoading" size="large" class="mid-spin"/>
                <router-view class="router"/>
                <Watermark />
            </a-layout-content>
        <Footer />
    </a-layout>
  </a-layout>
  <login v-else/>
  <drawer v-if="isAuthenticated"/>
</template>

<script>
import {useLoadingState} from '../../stores/data-load';
import Footer from '../footer';
import BtnUser from '../logout';
import Breadcrumb from '../breadcrumb';
import Watermark from '../watermark';
import Drawer from '../drawer';
import router from '../../router';
import SearchBar from '../search-bar';
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue';
import Login from '../../views/login';
import {isMobileMd} from '../../common/utils/screen';

export default {
  name: 'LayoutDashboard',

  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Breadcrumb,
    Watermark,
    BtnUser,
    Footer,
    Login,
    SearchBar,
    Drawer
  },

  data() {
    return {
      collapsed: isMobileMd(),
      selectedKeys: [],
      openKeys: [],
      menuItems: [],
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
    };
  },

  setup() {
    const useLoading = useLoadingState();

    return {useLoading};
  },

  watch: {
    $route(to) {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    },

    '$route.path'(newPath) {
      this.selectedKeys = [newPath];
    },

    collapsed(newVal) {
      if (!newVal) {
        this.openKeys = this.storedOpenKeys || [];
      } else {
        this.storedOpenKeys = [...this.openKeys];
        this.openKeys = [];
      }
    },
    isMobileMd(newVal) {
      this.collapsed = newVal;
    }
  },

  computed: {
      isMobileMd() {
        return isMobileMd();
      }
  },

  mounted() {
    this.generateMenuItems();
  },

    methods: {
        toggleCollapsed() {
          this.collapsed = !this.collapsed;
        },

        generateMenuItems() {
            this.menuItems = router.options.routes
            .filter(route => !route?.meta.hidden)
            .map(route => {
                const item = {
                    path: route.path,
                    label: route.meta?.label,
                    icon: route.meta?.icon,
                    children: route.children
                    ?.filter(route => !route.meta.hidden)
                    .map(child => ({
                        path: `${route.path.replace(/\/$/, '')}/${child.path.replace(/^\//, '')}`,
                        label: child.meta?.label,
                        icon: child.meta?.icon,
                    })) || null
              };
              return item;
            });
        }
    }
};
</script>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
}

.trigger:hover {
  color: #1890ff;
}

.btnUser {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
}

.ant-layout-header .ant-space .ant-space-item {
  display: flex;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  height: 64px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.breadcrumb {
  margin-top: 10px;
  margin-bottom: 10px;
}

.router {
  font-size: 20px;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}

.mid-spin {
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

