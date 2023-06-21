const dashboard = {
    path: '/dashboard',
    name: 'Dashboard',
    children: [
        {
            path: "",
            name: "Default",
            component: () => import('@/views/Dashboard/Default.vue'),
            meta: { auth: true },
        },
        {
            path: "tables",
            name: "Tables",
            component: () => import('@/views/Dashboard/Tables.vue'),
            meta: { auth: true },
        },
        {
            path: "billing",
            name: "Billing",
            component: () => import('@/views/Dashboard/Billing.vue'),
            meta: { auth: true },
        },
        {
            path: "todo",
            name: "ToDo",
            component: () => import('@/views/Dashboard/ToDo.vue'),
            meta: { auth: true },
        },
        {
            path: "profile",
            name: "Profile",
            component: () => import('@/views/Dashboard/Profile.vue'),
            meta: { auth: true },
        },
        {
            path: "data-scw",
            name: "Scw",
            component: () => import('@/views/Dashboard/Scw/Scw.vue'),
            meta: { auth: true },
        },
        {
            path: "mesin",
            name: "Mesin",
            component: () => import('@/views/Dashboard/Mesin/Mesin.vue'),
            meta: { auth: true },
        },
        {
            path: "employee",
            name: "Employee",
            component: () => import('@/views/Dashboard/Employee/Employee.vue'),
            meta: { auth: true },
        },
        {
            path: "history",
            name: "History",
            component: () => import('@/views/Dashboard/History/History.vue'),
            meta: { auth: true },
        },
    ]
};

export default dashboard;