const courses = [
    {
        name: "♟️Business Strategy Fundamentals",
        source: "Noah Sterling",
        target: "beginner",
        tag: "♟️Business Strategy",
        duration: "01:25:12"
    },
    {
        name: "♟️Strategic Thinking for Managers",
        source: "Sofia Martinez",
        target: "intermediate",
        tag: "♟️Business Strategy",
        duration: "02:10:05"
    },
    {
        name: "📘TypeScript for Professionals",
        source: "Liam Chen",
        target: "intermediate",
        tag: "🌐WEB Development",
        duration: "02:20:10"
    },
    {
        name: "🟨JavaScript Fundamentals",
        source: "Liam Chen",
        target: "beginner",
        tag: "🌐WEB Development",
        duration: "02:40:12"
    },
    {
        name: "❤️‍🩹Emotional Intelligence at Work",
        source: "Sofia Martinez",
        target: "general",
        tag: "🌱Personal Development",
        duration: "01:12:18"
    },
    {
        name: "🌱Personal Development Roadmap",
        source: "Noah Sterling",
        target: "general",
        tag: "🌱Personal Development",
        duration: "00:52:40"
    },
    {
        name: "⚛️Modern React Development",
        source: "Liam Chen",
        target: "intermediate",
        tag: "🎨Frontend Development",
        duration: "03:12:48"
    },
    {
        name: "🌐Web Development Fundamentals",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🎨Frontend Development",
        duration: "01:48:55"
    },
    {
        name: "🎨Frontend UI Essentials",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🎨Frontend Development",
        duration: "01:48:55"
    },
    {
        name: "🏗️Software Architecture Principles",
        source: "Noah Sterling",
        target: "intermediate",
        tag: "🏗️Software Architecture",
        duration: "02:00:40"
    },
    {
        name: "🕸️Microservices Architecture",
        source: "Liam Chen",
        target: "advanced",
        tag: "🏗️Software Architecture",
        duration: "02:58:41"
    },
    {
        name: "🔍Debugging & Code Quality Best Practices",
        source: "Liam Chen",
        target: "general",
        tag: "🏗️Software Engineering",
        duration: "01:10:30"
    },
    {
        name: "🧠Software Engineering Essentials",
        source: "Noah Sterling",
        target: "general",
        tag: "🏗️Software Engineering",
        duration: "01:22:19"
    },
    {
        name: "✉️Writing Professional Emails",
        source: "Sofia Martinez",
        target: "beginner",
        tag: "💬Communication",
        duration: "00:55:12"
    },
    {
        name: "🌏Cross-Cultural Communication Skills",
        source: "Sofia Martinez",
        target: "general",
        tag: "💬Communication",
        duration: "01:22:11"
    },
    {
        name: "💬Clear & Confident Communication",
        source: "Noah Sterling",
        target: "general",
        tag: "💬Communication",
        duration: "00:58:10"
    },
    {
        name: "💬Essential of Business Communication",
        source: "Sofia Martinez",
        target: "general",
        tag: "💬Communication",
        duration: "01:20:44"
    },
    {
        name: "🗣️Data Storytelling for Executives",
        source: "Ava Nakamura",
        target: "general",
        tag: "💬Communication",
        duration: "00:58:44"
    },
    {
        name: "🐍Python for Business Analytics",
        source: "Ava Nakamura",
        target: "beginner",
        tag: "💻Programming",
        duration: "01:47:33"
    },
    {
        name: "💻Programming Logic & Problem Solving",
        source: "Noah Sterling",
        target: "general",
        tag: "💻Programming",
        duration: "01:32:18"
    },
    {
        name: "👨‍💼HR & People Management Basics",
        source: "Noah Sterling",
        target: "general",
        tag: "💼HR Management",
        duration: "01:05:50"
    },
    {
        name: "🤝Conflict Resolution in the Workplace",
        source: "Sofia Martinez",
        target: "general",
        tag: "💼HR Management",
        duration: "01:05:20"
    },
    {
        name: "🌀Agile Leadership Essentials",
        source: "Sofia Martinez",
        target: "intermediate",
        tag: "📅Project Management",
        duration: "01:58:42"
    },
    {
        name: "📅Project Management Fundamentals",
        source: "Sofia Martinez",
        target: "beginner",
        tag: "📅Project Management",
        duration: "02:25:10"
    },
    {
        name: "📅Project Management Starter Kit",
        source: "Noah Sterling",
        target: "beginner",
        tag: "📅Project Management",
        duration: "01:30:22"
    },
    {
        name: "📈Data Visualization with Tableau",
        source: "Ava Nakamura",
        target: "intermediate",
        tag: "📈Data Visualization",
        duration: "02:22:18"
    },
    {
        name: "📊Data Analysis Foundation",
        source: "Noah Sterling",
        target: "beginner",
        tag: "📊Data Analysis",
        duration: "01:10:22"
    },
    {
        name: "📊Foundation of Data Literacy",
        source: "Ava Nakamura",
        target: "general",
        tag: "📊Data Analysis",
        duration: "01:12:45"
    },
    {
        name: "📐Applied Statistics for Analysts",
        source: "Ava Nakamura",
        target: "intermediate",
        tag: "📐Statistics",
        duration: "01:59:20"
    },
    {
        name: "📐Practical Statistics for Work",
        source: "Noah Sterling",
        target: "general",
        tag: "📐Statistics",
        duration: "01:12:33"
    },
    {
        name: "🔌Building Backend Services",
        source: "Noah Sterling",
        target: "intermediate",
        tag: "🔌Backend Development",
        duration: "02:12:40"
    },
    {
        name: "🔌Building REST APIs with Node.js",
        source: "Liam Chen",
        target: "intermediate",
        tag: "🔌Backend Development",
        duration: "02:55:33"
    },
    {
        name: "🔄️Building ETL Pipelines",
        source: "Ava Nakamura",
        target: "intermediate",
        tag: "🔧Data Engineering",
        duration: "02:15:42"
    },
    {
        name: "🔧Data Engineering Basics",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🔧Data Engineering",
        duration: "01:28:44"
    },
    {
        name: "📈Visualizing Insights with Charts",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🔧Data Visualization",
        duration: "01:15:55"
    },
    {
        name: "🗄️Introduction to Databases",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🗄️Databases",
        duration: "01:25:40"
    },
    {
        name: "🧱SQL for Absolute Beginners",
        source: "Ava Nakamura",
        target: "beginner",
        tag: "🗄️Databases",
        duration: "02:05:10"
    },
    {
        name: "🤖AI & Machine Learning Overview",
        source: "Noah Sterling",
        target: "general",
        tag: "🤖AI ML",
        duration: "01:40:12"
    },
    {
        name: "🤖Machine Learning Essentials",
        source: "Ava Nakamura",
        target: "intermediate",
        tag: "🤖AI ML",
        duration: "03:10:54"
    },
    {
        name: "🧠Deep Learning with TensorFlow",
        source: "Ava Nakamura",
        target: "advanced",
        tag: "🤖AI ML",
        duration: "03:35:12"
    },
    {
        name: "🧬Feature Engineering Techniques",
        source: "Ava Nakamura",
        target: "advanced",
        tag: "🤖AI ML",
        duration: "02:48:29"
    },
    {
        name: "🎙️Executive Presence & Influence",
        source: "Sofia Martinez",
        target: "advanced",
        tag: "🧭Leadership",
        duration: "01:35:55"
    },
    {
        name: "🧭Leadership Skills for New Managers",
        source: "Noah Sterling",
        target: "general",
        tag: "🧭Leadership",
        duration: "01:10:33"
    },
    {
        name: "🧭Leading High-Performance Teams",
        source: "Sofia Martinez",
        target: "intermediate",
        tag: "🧭Leadership",
        duration: "01:48:33"
    },
    {
        name: "🐋Docker & Containerization",
        source: "Liam Chen",
        target: "general",
        tag: "🚀DEV OPS",
        duration: "02:05:22"
    },
    {
        name: "📦Kubernetes for Engineers",
        source: "Liam Chen",
        target: "advanced",
        tag: "🚀DEV OPS",
        duration: "03:25:19"
    },
    {
        name: "🚀CI&CD with GitHub Actions",
        source: "Liam Chen",
        target: "intermediate",
        tag: "🚀DEV OPS",
        duration: "01:48:55"
    },
    {
        name: "🚀DevOps for Beginners",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🚀DEV OPS",
        duration: "01:35:18"
    },
    {
        name: "🌿Git & GitHub Crash Course",
        source: "Liam Chen",
        target: "beginner",
        tag: "🛠️Development Tools",
        duration: "01:15:00"
    },
    {
        name: "🛠️Essential Developer Tools",
        source: "Noah Sterling",
        target: "beginner",
        tag: "🛠️Development Tools",
        duration: "01:20:05"
    },
];

export default courses;