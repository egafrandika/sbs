import { createRouter, createWebHistory } from 'vue-router';
import ShipmentList from '../views/shipment-list/shipment';
import UserList from '../views/shipment-list/user-list';
import NotFound from '../components/not-found';
import Sbs from '../views/home';
import Login from '../views/login';
import OrderCreate from '../views/shipment-list/order';
import OrderList from '../views/shipment-list/order-list';
import { 
    BarChartOutlined,
    RadiusSettingOutlined,
    ColumnWidthOutlined,
    UnorderedListOutlined,
    OrderedListOutlined
} from '@ant-design/icons-vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false,
            label: 'Login',
            hidden: true
        }
    },
    { 
        path: '/',
        name: 'Home',
        component: Sbs,
        meta: {
            hidden: true
        }
    },
    {
        path: '/master-data',
        name: 'MasterData',
        redirect: {name: 'DaftarKapal'},
        meta: {
            label: 'Master Data',
            icon: BarChartOutlined,
            breadcrumb: 'Master Data'
        },
        children: [
            {
                path: 'vessel-list',
                component: ShipmentList,
                name: 'vessel-list',
                meta: { 
                    label: 'Vessel List', 
                    icon: RadiusSettingOutlined,
                    breadcrumb: 'Vessel List'
                }
            },
            {
                path: 'user-list',
                component: UserList,
                name: 'UserList',
                meta: { 
                    label: 'User List', 
                    icon: ColumnWidthOutlined,
                    breadcrumb: 'User List'
                }
            },
            {
                path: 'order',
                component: OrderCreate,
                name: 'OrderCreate',
                meta: { 
                    label: 'Order Create', 
                    icon: UnorderedListOutlined,
                    hidden: true,
                    breadcrumb: 'Order Create'
                }
            },
            {
                path: 'order-list',
                component: OrderList,
                name: 'OrderList',
                meta: { 
                    label: 'Order List', 
                    icon: OrderedListOutlined,
                    breadcrumb: 'Order List'
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            requiresAuth: false,
            hidden: true
        }
    }
];

const setRequiresAuthDefault = (routes) => {
    routes.forEach(route => {
        if (!route.meta) {
            route.meta = {};
        }
        if (route.meta.requiresAuth === undefined) {
            route.meta.requiresAuth = true;
        }
        if (route.children) {
            setRequiresAuthDefault(route.children);
        }
    });
};
setRequiresAuthDefault(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const routeExist = router.getRoutes().some(route => route.name === to.name);

    if(!routeExist) {
        next({name: 'Home'});
        return;
    }

    if (to.name !== 'Login' && to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } else if (to.name === 'Login' && isAuthenticated) {
        next({ name: 'Home' });
    } else {
        next();
    }
});
  

export default router;
