export const leads = [
    {
        id: 101,
        company_name: "Swiss Co",
        industry: "Manufacturing",
        estimated_value: "4659",
        lead_score: 73,
        status: { id: 1 },
        assigned_to: { first_name: "Anna", last_name: "Müller" },
        category: { name: "Premium", color: "#e91e63" },
        tags: [
            { id: 1, name: "Hot", color: "#ff5722" },
            { id: 2, name: "Europe", color: "#3f51b5" }
        ],
    },
    {
        id: 102,
        company_name: "TechVision",
        industry: "SaaS",
        estimated_value: "12900",
        lead_score: 85,
        status: { id: 2 },
        assigned_to: { first_name: "John", last_name: "Doe" },
        category: { name: "Startup", color: "#4caf50" },
        tags: [
            { id: 3, name: "High Value", color: "#9c27b0" }
        ],
    },
    {
        id: 103,
        company_name: "Global Agro",
        industry: "Agriculture",
        estimated_value: "9800",
        lead_score: 60,
        status: { id: 3 },
        assigned_to: { first_name: "Emily", last_name: "Schmidt" },
        category: { name: "Regular", color: "#00bcd4" },
        tags: [],
    },
];