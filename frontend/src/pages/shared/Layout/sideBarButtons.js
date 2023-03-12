export const customerMenu = [
    {
        name: "Show Companies",
        path: "/show-companies",
        icon: "fa-solid fa-house",
    },

    {
        name: "My Orders",
        path: "/customer/show-placed-orders",
        icon: "fa-solid fa-list",
    },
    {
        name: "Payment Details",
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
        name: "Show Companies",
        path: "/show-companies",
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Customer Plans",
        path: "/owner/customer-plans",
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Assigned Customer Plans",
        path: "/owner/assigned/plans",
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Pending Orders",
        path: "/owner/show-pending-orders",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Show Assigned Orders",
        path: "/owner/show-assigned-orders",
        icon: "fa-solid fa-user",
    },
    {
        name: "Show Worker Application",
        path: "/owner/show-worker-applications",
        icon: "fa-solid fa-user-doctor",
    },
    {
        name: "Get Payment Details",
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
        name: "Show Delivered Orders",
        path: "/worker/orders/delievered",
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Assigned Orders",
        path: "/worker/orders/assigned",
        icon: "fa-solid fa-list",
    },
    {
        name: "Show Daily Orders",
        path: "/worker/orders/daily",
        icon: "fa-solid fa-list",
    },
    {
        name: "Profile",
        path: "/worker/profile",
        icon: "fa-solid fa-user",
    }
];
export const adminMenu = [
    {
        name: "Show Customers",
        path: '/admin/show-customers',
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Owners",
        path: '/admin/show-owners',
        icon: "fa-solid fa-house",
    },
    {
        name: "Show Owners Applications",
        path: "/admin/show-owners-applications",
        icon: "fa-solid fa-house",
    }
]
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