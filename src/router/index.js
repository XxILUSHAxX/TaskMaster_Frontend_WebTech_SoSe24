// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes = [
    {
        path: '/tasks',
        name: 'HomePage',
        component: HomePage
    },
    // Redirect all other paths to TasksPage
    {
        path: '/:pathMatch(.*)*',
        redirect: '/tasks'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
