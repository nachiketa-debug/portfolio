export const experienceData = {
    name: "Nachiketa Verma",
    phone: "7667956617",
    email: "nachiketaverma8@gmail.com",
    linkedin: "https://www.linkedin.com/in/nachiketa-verma-17775a268/",
    github: "https://github.com/Nachiketaverma",

    summary: "Full Stack Developer with hands-on experience building scalable and responsive web applications using JavaScript, React, Node.js, TypeScript, and Python. Experienced in delivering government and enterprise-level projects, integrating APIs, optimizing performance, and collaborating with cross-functional teams. Focused on writing clean, maintainable code that improves user experience and business outcomes.",

    experience: [
        {
            title: "Junior Software Engineer",
            company: "Vyoma Innovus Global",
            location: "Kolkata",
            period: "July 2025 – Present",
            achievements: [
                "Built and shipped features for government-facing web apps using React and Node.js, working closely with senior developers to understand the codebase.",
                "Integrated third-party APIs and handled basic authentication flows — took some trial and error but got there.",
                "Wrote reusable React components and kept them consistent across projects, which saved time during future development.",
                "Spotted and fixed a few database query issues that were slowing things down — mostly learned by reading slow query logs.",
                "Participated in daily standups, picked up tasks from Jira, and pushed code through Git — got comfortable with team workflows.",
                "Worked on the frontend for the Yatri Subidha portal, translating Figma designs into responsive pages."
            ]
        }
    ],

    education: [
        {
            degree: "Bachelor's of Technology",
            field: "Computer Science",
            institution: "Aryabhatta Knowledge University",
            location: "Patna, Bihar",
            period: "2017 - 2021",
            gpa: "8.3"
        },
        {
            degree: "XII",
            institution: "Govt. Inter College Zilla School",
            location: "Purnea, Bihar",
            period: "2015 - 2017",
            percentage: "58%"
        }
    ],

    projects: [
        {
            name: "Smart Traffic Management System",
            client: "Kolkata Police · Dept. of IT, WB",
            category: "Government",
            stack: ["React.js", "Node.js", "WebSocket", "MySQL"],
            description: [
                "Built a real-time dashboard visualizing live traffic signals, congestion heatmaps, and incident alerts across the city grid.",
                "Engineered WebSocket-driven monitoring that detects and flags traffic anomalies within seconds, cutting response time significantly.",
                "Optimized frontend rendering for high-frequency data streams, keeping the UI smooth under heavy load."
            ]
        },
        {
            name: "CCTV Integrated Management System",
            client: "Kolkata Police · Dept. of IT, WB",
            category: "Government",
            stack: ["React.js", "Express.js", "MySQL", "REST API"],
            description: [
                "Centralized health monitoring for hundreds of CCTV units across traffic signal locations — online, offline, or faulty status tracked live.",
                "Built an automated alerting pipeline that notifies field teams the moment a camera goes down, minimizing blind spots.",
                "Designed role-based dashboards for Admins, Field Engineers, and Vendors, each with context-specific controls and escalation workflows."
            ]
        },
        {
            name: "Yatri Subidha V2",
            client: "Land Port Authority of India · Dept. of IT, WB",
            link: "https://yatrisuvidha.wb.gov.in/",
            category: "Government",
            stack: ["React.js", "Node.js", "QR Code", "SMS API", "MySQL"],
            description: [
                "Architected a slot-booking system handling thousands of border-crossing registrations with real-time availability sync.",
                "Delivered QR-code digital travel passes, replacing paper-based checkpoint verification and reducing queues by 60%.",
                "Wired SMS/email notification flows for booking confirmations, schedule changes, and emergency travel alerts."
            ]
        },
        {
            name: "Pharmacy Board Management System",
            client: "Pharmacy Council · Examination Board",
            category: "Enterprise",
            stack: ["React 19", "Vite", "Laravel", "MySQL", "Framer Motion", "XLSX"],
            description: [
                "Engineered end-to-end student lifecycle management — from registration and eligibility checks to roll number assignment for thousands of pharmacy students.",
                "Built automated exam logistics: scheduling, room/center allocation, and Hall Ticket generation, cutting administrative overhead by ~40%.",
                "Implemented a masked evaluation workflow where answer scripts are anonymized during marking and decoded post-verification, ensuring zero bias.",
                "Delivered Excel-powered reporting tools exporting Registered Student Reports, Attendance Lists, and Descriptive Rolls with a single click."
            ]
        },
        {
            name: "Digital Governance & Certification Portal",
            client: "Webel IT/ITES · West Bengal Electronics Corp.",
            category: "E-Governance",
            stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "jsPDF", "Recharts", "Zod"],
            description: [
                "Architected a full NOC/UDIN lifecycle platform serving Individuals, Companies, and Government Authorities — each with isolated, role-specific dashboards.",
                "Integrated Aadhaar-based OTP verification as the primary identity layer for all document submissions, ensuring regulatory compliance.",
                "Built a real-time PDF certificate engine using jsPDF + html2canvas that generates and downloads provisional and final NOC documents on the fly.",
                "Designed a Recharts analytics dashboard giving authorities instant visibility into application pipelines, payment status, and processing bottlenecks."
            ]
        }
    ],

    skills: {
        frontend: ["JavaScript", "React.js", "Next.js 13", "TypeScript"],
        backend: ["Node.js", "Express.js", "TypeScript", "Python"],
        databases: ["MySQL", "MongoDB"],
        devops: ["Docker",  "AWS"]
    },

    certifications: [
        {
            name: "Full-Stack Web Development",
            provider: "Udemy",
            year: "2023"
        },
        {
            name: "Python for Everybody Specialization",
            provider: "Coursera",
            year: "2023"
        }
    ]
};
