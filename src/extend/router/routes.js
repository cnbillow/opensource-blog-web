export const routes = [
    {
        name: 'login',
        path: '/login',
        meta: {
            requiresAuth: false
        },
        component: (resolve) => {
            require(['@/pages/login'], resolve)
        }
    },
    {
        name: 'register',
        path: '/register',
        meta: {
            requiresAuth: false
        },
        component: (resolve) => {
            require(['@/pages/register'], resolve)
        }
    },
    {
        name: 'home',
        path: '/',
        meta: {
            requiresAuth: false
        },
        component: (resolve) => {
            require(['@/pages/home'], resolve)
        }
    },
    {
        name: 'article',
        path: '/article/:id',
        meta: {
            requiresAuth: false
        },
        component: (resolve) => {
            require(['@/pages/article'], resolve)
        }
    },
    {
        name: 'tag',
        path: '/tag/:id',
        meta: {
            requiresAuth: false
        },
        component: (resolve) => {
            require(['@/pages/tag'], resolve)
        }
    },
    {
        name: 'author',
        path: '/author/:id',
        meta: {
            requiresAuth: false
        },
        component: (resolve) => {
            require(['@/pages/author'], resolve)
        }
    },
    {
        name: 'my-publish',
        path: '/my-publish',
        meta: {
            requiresAuth: true
        },
        component: (resolve) => {
            require(['@/pages/my-publish'], resolve)
        }
    },
    {
        name: 'my-contents',
        path: '/my-contents',
        meta: {
            requiresAuth: true
        },
        component: (resolve) => {
            require(['@/pages/my-contents'], resolve)
        }
    },
    {
        name: 'my-comments',
        path: '/my-comments',
        meta: {
            requiresAuth: true
        },
        component: (resolve) => {
            require(['@/pages/my-comments'], resolve)
        }
    },
    {
        name: 'my-article',
        path: '/my-article/:id',
        meta: {
            requiresAuth: true
        },
        component: (resolve) => {
            require(['@/pages/my-article'], resolve)
        }
    }
]
