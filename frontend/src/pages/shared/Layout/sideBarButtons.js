export const customerMenu = [
    {
        name: "Show companies",
        path: "/show-companies",
        icon: "fa-solid fa-house",
    },

    {
        name: "My orders",
        path: "/customer/show-placed-orders",
        icon: "fa-solid fa-list",
    },
    {
        name: "payment details",
        path: "/customer/get-payment-details",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Profile",
        path: "/customer/profile",
        icon: "fa-solid fa-user",
    },
    {
        name: "My Plans",
        path: "/customer/get-subscription-details",
        icon: "fa-solid fa-user",
    }
];

// admin menu
export const ownerMenu = [
    {
        name: "Show companies",
        path: "/show-companies",
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Customer plans",
        path: "/owner/customer-plans",
        icon: "fa-solid fa-house",
    },
    {
        name: "Show pending orders",
        path: "/owner/show-pending-orders",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "show assigned orders",
        path: "/owner/show-assigned-orders",
        icon: "fa-solid fa-user",
    },
    {
        name: "Worker Order Query",
        path: "/owner/show-in-query-orders",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "show worker application",
        path: "/owner/show-worker-applications",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "get payment details",
        path: "/owner/get-payment-details",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Profile",
        path: "/owner/profile",
        icon: "fa-solid fa-user",
    }
];
export const workerMenu = [
    {
        name: "show delievered Orders",
        path: "/worker/orders/delievered",
        icon: "fa-solid fa-house",
    },
    {
        name: "show assigned orders",
        path: "/worker/orders/assigned",
        icon: "fa-solid fa-list",
    },
    {
        name: "Profile",
        path: "/worker/profile",
        icon: "fa-solid fa-user",
    }
];
export const guestMenu = [
    {
        name: "Apply for a job",
        path: "/show-companies",
        icon: "fa-solid fa-house",
    },
    {
        name: "Register as Customer",
        path: '/customer/register',
        icon: "fa-solid fa-user", //  try to change it
    },
    {
        name: "Register as Owner",
        path: '/owner/register',
        icon: "fa-solid fa-user", //  try to change it
    },
    {
        name: "Login",
        path: '/',
        icon: "fa-solid fa-user", //  try to change it
    }
];