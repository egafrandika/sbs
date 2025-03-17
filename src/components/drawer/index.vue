<!--
 * @Author: egafrandika
 * @Date: 2025-03-14 13:12:22
 * @LastEditors: egafrandika
 * @LastEditTime: 2025-03-17 14:29:45
 -->
<template>
  <div
      v-if="isMobile"
      class="drawer"
  >
      <menu-outlined
          @click="toggleSidebar"
      />
  </div>
  <a-drawer
      :placement="placement"
      :closable="true"
      width="50%"
      rootClassName="drawer-menu"
      :bodyStyle="{ padding: '0', background: '#001529'}"
      :headerStyle="{ background: '#001529' }"
      :open="drawerOpen"
      @close="onClose"
  >
      <template #closeIcon>
        <CloseOutlined style="color: white; font-size: 16px" />
      </template>
      <template #title>
          <span style="color: white">SBS</span>
      </template>
      <a-menu
          v-model:selectedKeys="selectedKeys"
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
          </template>
      </a-menu>
  </a-drawer>
</template>

<script>
import {MenuOutlined, CloseOutlined} from '@ant-design/icons-vue';
import {isMobileMd} from '../../common/utils/screen';
import { Drawer } from "ant-design-vue";
import router from '../../router';
export default {
    name: 'Drawer',

    components: {
        CloseOutlined,
        MenuOutlined,
        ADrawer: Drawer
    },

    data() {
        return {
            isMobile: isMobileMd(),
            drawerOpen: false,
            placement: 'left',
            menuItems: [],
            selectedKeys: [],
        }
    },

    mounted() {
        this.generateMenuItems();
    },

    watch: {
        '$route.path'(newPath) {
          this.selectedKeys = [newPath];
        },
    },

    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar');
            this.drawerOpen = !this.drawerOpen;
        },

        onClose() {
            this.drawerOpen = false;
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
}
</script>

<style lang="scss" scoped>
    .drawer {
        position: fixed;
        top: 100px;
        width: 41px;
        height: 40px;
        cursor: pointer;
        z-index: 100;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        box-shadow: 2px 0 8px #00000026;
        border-radius: 0 4px 4px 0;
    }

    .custom-drawer .ant-drawer-close {
        color: white !important;
        font-size: 16px;
    }
</style>
