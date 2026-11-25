import {
  ChatMessage,
  FeedbackComment,
  GradeItem,
  LessonModule,
  NotificationItem,
  StudentProfile,
} from "@/types/lms";

export const STUDENT_PROFILE: StudentProfile = {
  name: "NEIL ALFRED JAGORIN SIERRA",
  studentId: "2024-2-01779",
  courseSection: "IT302-WM",
  email: "neil.sierra@lpunetwork.edu.ph",
  institution: "LPU",
  institutionShort: "LPUC",
};

export const INSTRUCTOR_CONTACT = {
  name: "Cabarles, Axel Gabriel",
  role: "SAP Business One Instructor",
  initials: "AC",
};

export const SUPPORT_CONTACT = {
  phone: "(0917) 1837 823",
  email: "sapb1_lms@northlogic.com.ph",
  facebook: "Erudite Support Team",
  loginHours: "Monday to Friday, 8AM-6PM",
  authHours: "Monday to Friday, 8AM-5PM",
};

const HARDWARE_PAGES = [
  {
    pageNumber: 1,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "SAP Business One Hardware Requirements Guide",
    subtitle: "Release Family 9.0 and Higher",
    sections: [
      {
        heading: "Document Overview",
        paragraphs: [
          "This guide provides hardware sizing recommendations, supported operating environments, and infrastructure prerequisites for deploying SAP Business One (Release Family 9.0 and higher) on Microsoft SQL Server.",
          "Proper hardware sizing ensures consistent transaction throughput, reliable backup windows, and responsive client performance across concurrent users.",
        ],
      },
      {
        heading: "Target Audience",
        bullets: [
          "System Administrators and IT Infrastructure Engineers",
          "SAP Business One Implementation Consultants",
          "IT302-WM Students preparing local or lab SAP B1 environments",
        ],
      },
    ],
  },
  {
    pageNumber: 2,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "Table of Contents & Revision History",
    sections: [
      {
        heading: "Guide Structure",
        bullets: [
          "1. General Sizing Guidelines and Architecture Overview",
          "2. Server Hardware Requirements (MS SQL Server & License Server)",
          "3. Client Workstation Requirements",
          "4. Network, Storage IOPS, and Virtualization",
          "5. Supported Operating Systems and Database Editions",
        ],
      },
      {
        heading: "Document Version 1.16 Notes",
        paragraphs: [
          "Updated memory baselines for SAP Business One 10.0 client workstations and clarified SSD storage recommendations for MS SQL Server transaction logs.",
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "1. Architecture Overview",
    sections: [
      {
        heading: "Two-Tier vs. Three-Tier Deployment",
        paragraphs: [
          "SAP Business One operates with a central Microsoft SQL Server database tier, a System Landscape Directory (SLD) and License Manager service, and the SAP Business One Client or Web Client.",
          "For small lab deployments (1–5 users), the Server Tools and SQL Server may reside on a single host. Production environments above 10 concurrent users should isolate database and application services.",
        ],
      },
    ],
  },
  {
    pageNumber: 4,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "2. Server Hardware Requirements (Small: 1–10 Users)",
    sections: [
      {
        heading: "Minimum & Recommended Server Specs",
        table: {
          headers: ["Component", "Minimum", "Recommended"],
          rows: [
            ["Processor", "Quad-Core x64 2.4 GHz", "6-Core / 8-Core x64 3.0+ GHz"],
            ["Memory (RAM)", "16 GB", "32 GB ECC RAM"],
            ["Storage", "250 GB SATA/SAS", "500 GB NVMe / Enterprise SSD (RAID 10)"],
            ["Network", "1 Gbps Ethernet", "1 Gbps / 10 Gbps Dedicated NIC"],
          ],
        },
      },
    ],
  },
  {
    pageNumber: 5,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "2.1 Medium & Large Server Sizing (11–100+ Users)",
    sections: [
      {
        heading: "Scaling Parameters",
        table: {
          headers: ["Concurrent Users", "CPU Cores", "RAM", "Disk Subsystem"],
          rows: [
            ["11 – 25 Users", "8 Cores", "32 – 64 GB", "RAID 10 SSD (Separate Data & Log)"],
            ["26 – 50 Users", "12 – 16 Cores", "64 – 128 GB", "Enterprise NVMe RAID 10"],
            ["51 – 100+ Users", "16+ Cores", "128+ GB", "Dedicated SAN / High-IOPS NVMe"],
          ],
        },
      },
    ],
  },
  {
    pageNumber: 6,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "3. Client Workstation Requirements",
    sections: [
      {
        heading: "SAP Business One Desktop Client",
        table: {
          headers: ["Component", "Minimum", "Recommended"],
          rows: [
            ["CPU", "Intel Core i3 / AMD Ryzen 3 (64-bit)", "Intel Core i5 / Ryzen 5 or higher"],
            ["RAM", "8 GB", "16 GB"],
            ["Free Disk Space", "20 GB", "50 GB SSD"],
            ["Display", "1280 × 1024", "1920 × 1080 (Full HD)"],
          ],
        },
      },
    ],
  },
  {
    pageNumber: 7,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "4. Storage Layout & IOPS Best Practices",
    sections: [
      {
        heading: "Separating I/O Workloads",
        bullets: [
          "OS & SAP Binaries: Dedicated volume (minimum 100 GB free).",
          "MS SQL Data Files (.mdf): High-read/write RAID 10 SSD volume.",
          "MS SQL Transaction Logs (.ldf): Separate physical/logical volume for sequential writes.",
          "TempDB & Backups: Isolated storage target to avoid contention.",
        ],
      },
    ],
  },
  {
    pageNumber: 8,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "5. Network Bandwidth & Latency",
    sections: [
      {
        heading: "LAN & Remote Access Requirements",
        paragraphs: [
          "SAP Business One Client communicates heavily with MS SQL Server over TCP/IP (default port 1433) and SLD (port 40000). Round-trip latency on the LAN must remain below 2 ms.",
          "For remote branches, deploy Remote Desktop Services (RDS) or Citrix rather than running the fat client directly over high-latency WAN links.",
        ],
      },
    ],
  },
  {
    pageNumber: 9,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "6. Supported Operating Systems",
    sections: [
      {
        heading: "Windows Server & Client Compatibility",
        bullets: [
          "Server: Windows Server 2019 / 2022 Standard or Datacenter (64-bit)",
          "Client: Windows 10 Pro / Enterprise (64-bit) or Windows 11 Pro / Enterprise",
          "Note: Home editions of Windows are not supported for production SAP Business One installations.",
        ],
      },
    ],
  },
  {
    pageNumber: 10,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "7. Microsoft SQL Server Prerequisites",
    sections: [
      {
        heading: "Supported Database Versions",
        bullets: [
          "Microsoft SQL Server 2019 (Standard / Enterprise)",
          "Microsoft SQL Server 2022 (Standard / Enterprise)",
          "Required Collation: SQL_Latin1_General_CP1_CI_AS (or case-insensitive matching regional collation)",
          "Authentication Mode: Mixed Mode (SQL Server and Windows Authentication)",
        ],
      },
    ],
  },
  {
    pageNumber: 11,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "8. Virtualization Guidelines",
    sections: [
      {
        heading: "VMware ESXi & Microsoft Hyper-V",
        paragraphs: [
          "When virtualizing SAP Business One, reserve 100% of allocated vRAM for the SQL Server VM to prevent memory ballooning.",
          "Avoid CPU overcommitment on the database host and use paravirtualized SCSI controllers for database disks.",
        ],
      },
    ],
  },
  {
    pageNumber: 12,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "9. Add-ons, DI API & Integration Framework",
    sections: [
      {
        heading: "Additional Memory Allocation",
        paragraphs: [
          "Each active SAP Business One add-on, DI Server instance, or Integration Framework (B1if) scenario consumes additional RAM on the server or client.",
          "Allocate an extra 4–8 GB of RAM on the server when running SAP Business One Integration Framework or Service Layer workloads.",
        ],
      },
    ],
  },
  {
    pageNumber: 13,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "10. Pre-Installation Checklist",
    sections: [
      {
        heading: "Verification Before Setup",
        bullets: [
          "Verify static IP address and hostname resolution (DNS/hosts).",
          "Disable or configure Windows Firewall rules for ports 1433, 30000, 30010, and 40000.",
          "Ensure .NET Framework 4.8 and Visual C++ Redistributables are installed.",
          "Confirm local Administrator privileges for installation.",
        ],
      },
    ],
  },
  {
    pageNumber: 14,
    classification: "PUBLIC",
    headerTitle: "Hardware Requirements Guide",
    product: "SAP Business One",
    version: "Document Version: 1.16 – 2022-12-26",
    title: "11. Summary & Next Steps",
    sections: [
      {
        heading: "Ready for Module 1",
        paragraphs: [
          "Once your workstation or lab virtual machine meets the hardware and OS prerequisites outlined in this guide, proceed to M1 - Installing MS SQL Server.",
          "Review all 14 pages of this guide to mark your Discussion progress as 14/14 Done.",
        ],
      },
    ],
  },
];

export const LESSON_MODULES: LessonModule[] = [
  {
    slug: "hardware-requirements-guide",
    shortTitle: "Hardware Requirements Guide",
    title: "Hardware Requirements Guide",
    startDate: "October 08, 2026",
    endDate: "December 31, 2026",
    status: "OPEN",
    description:
      "Review server, client, storage, and MS SQL Server hardware prerequisites for SAP Business One Release Family 9.0 and higher.",
    thumbnail: "/assets/lessons/hardware-requirements-guide.png",
    totalPages: 14,
    videoTitle: "SAP B1 Hardware Sizing & Lab Walkthrough",
    videoDuration: "08:42",
    pages: HARDWARE_PAGES,
    quiz: [
      {
        id: "hrg-q1",
        question: "Which MS SQL Server authentication mode is required for SAP Business One?",
        options: [
          "Windows Authentication Only",
          "Mixed Mode (SQL Server and Windows Authentication)",
          "Azure Active Directory Only",
          "Anonymous Mode",
        ],
        correctIndex: 1,
        explanation:
          "SAP Business One requires Mixed Mode authentication so the `sa` and B1 service accounts can authenticate with SQL Server.",
      },
      {
        id: "hrg-q2",
        question: "What is the recommended minimum RAM for a small SAP B1 server (1–10 users)?",
        options: ["4 GB", "8 GB", "16 GB (32 GB recommended)", "2 GB"],
        correctIndex: 2,
        explanation:
          "A small server requires at least 16 GB RAM, with 32 GB ECC RAM recommended for stable performance.",
      },
      {
        id: "hrg-q3",
        question: "Which network port is used by default for the SAP Business One System Landscape Directory (SLD)?",
        options: ["8080", "1433", "40000", "3306"],
        correctIndex: 2,
        explanation: "SLD communicates over port 40000 by default, while MS SQL Server uses port 1433.",
      },
    ],
  },
  {
    slug: "m1-installing-ms-sql-server",
    shortTitle: "M1 - Installing MS SQL Server",
    title: "M1 - Installing MS SQL Server",
    startDate: "August 07, 2026",
    endDate: "December 31, 2026",
    status: "OPEN",
    description:
      "Step-by-step installation and configuration of Microsoft SQL Server with Mixed Mode authentication and TCP/IP enabled.",
    thumbnail: "/assets/lessons/m1.png",
    totalPages: 4,
    videoTitle: "Installing MS SQL Server for SAP B1",
    videoDuration: "14:20",
    pages: [
      {
        pageNumber: 1,
        classification: "PUBLIC",
        headerTitle: "M1 - Installing MS SQL Server",
        product: "SAP Business One",
        version: "Module 1 – Lab Guide",
        title: "Installing Microsoft SQL Server for SAP Business One",
        subtitle: "Instance Configuration, Collation & Mixed Mode Setup",
        sections: [
          {
            heading: "Learning Objectives",
            bullets: [
              "Run the SQL Server Installation Center as Administrator.",
              "Select Database Engine Services and Client Tools Connectivity.",
              "Configure the default instance (MSSQLSERVER) and collation.",
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        classification: "PUBLIC",
        headerTitle: "M1 - Installing MS SQL Server",
        product: "SAP Business One",
        version: "Module 1 – Lab Guide",
        title: "Server Configuration & Collation",
        sections: [
          {
            heading: "Collation Settings",
            paragraphs: [
              "Verify the collation is set to SQL_Latin1_General_CP1_CI_AS before proceeding past the Server Configuration step.",
            ],
          },
        ],
      },
      {
        pageNumber: 3,
        classification: "PUBLIC",
        headerTitle: "M1 - Installing MS SQL Server",
        product: "SAP Business One",
        version: "Module 1 – Lab Guide",
        title: "Database Engine Configuration",
        sections: [
          {
            heading: "Mixed Mode Authentication",
            paragraphs: [
              "Choose Mixed Mode, set a strong password for the `sa` account, and click 'Add Current User' to grant Windows sysadmin privileges.",
            ],
          },
        ],
      },
      {
        pageNumber: 4,
        classification: "PUBLIC",
        headerTitle: "M1 - Installing MS SQL Server",
        product: "SAP Business One",
        version: "Module 1 – Lab Guide",
        title: "Enabling TCP/IP in SQL Server Configuration Manager",
        sections: [
          {
            heading: "Post-Installation Network Step",
            paragraphs: [
              "Open SQL Server Configuration Manager -> SQL Server Network Configuration -> Protocols for MSSQLSERVER, enable TCP/IP, and restart the SQL Server service.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "m1-q1",
        question: "Which protocol must be enabled in SQL Server Configuration Manager for SAP B1 clients to connect?",
        options: ["Shared Memory only", "VIA", "TCP/IP", "AppleTalk"],
        correctIndex: 2,
        explanation: "TCP/IP must be enabled and listening on port 1433 for SAP Business One connections.",
      },
      {
        id: "m1-q2",
        question: "What is the built-in SQL Server system administrator login configured during Mixed Mode setup?",
        options: ["root", "admin", "sa", "sysdba"],
        correctIndex: 2,
        explanation: "The `sa` (System Administrator) login is configured during Mixed Mode setup.",
      },
    ],
  },
  {
    slug: "m2-sap-installation",
    shortTitle: "M2 - SAP Installation",
    title: "M2 - SAP Installation",
    startDate: "August 07, 2026",
    endDate: "December 31, 2026",
    status: "OPEN",
    description:
      "Install SAP Business One Server Tools (SLD, License Manager), Server Components, and the Desktop Client.",
    thumbnail: "/assets/lessons/m2.png",
    totalPages: 3,
    videoTitle: "SAP Business One Server & Client Installation",
    videoDuration: "18:05",
    pages: [
      {
        pageNumber: 1,
        classification: "PUBLIC",
        headerTitle: "M2 - SAP Installation",
        product: "SAP Business One",
        version: "Module 2 – Lab Guide",
        title: "SAP Business One Server & Client Installation",
        subtitle: "System Landscape Directory & Core Components",
        sections: [
          {
            heading: "Installation Sequence",
            bullets: [
              "1. Extract the SAP Business One installation package.",
              "2. Launch Setup.exe as Administrator.",
              "3. Install Server Tools (SLD, License Manager, Extension Manager).",
              "4. Install Server Components and Common Database (SBO-COMMON).",
              "5. Install SAP Business One Client.",
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        classification: "PUBLIC",
        headerTitle: "M2 - SAP Installation",
        product: "SAP Business One",
        version: "Module 2 – Lab Guide",
        title: "Configuring B1SiteUser & SLD",
        sections: [
          {
            heading: "SLD Credentials",
            paragraphs: [
              "Record your B1SiteUser password carefully; it is required to access the System Landscape Directory web console at https://<server>:40000/ControlCenter.",
            ],
          },
        ],
      },
      {
        pageNumber: 3,
        classification: "PUBLIC",
        headerTitle: "M2 - SAP Installation",
        product: "SAP Business One",
        version: "Module 2 – Lab Guide",
        title: "Verifying Client Connectivity",
        sections: [
          {
            heading: "First Launch",
            paragraphs: [
              "Open the SAP Business One Client, verify the License Server address, and confirm that demo or newly created company databases appear in the Choose Company window.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "m2-q1",
        question: "What is the name of the common system database created during SAP Business One Server installation?",
        options: ["SBO-MASTER", "SBO-COMMON", "SAP-SYSTEM", "B1-CORE"],
        correctIndex: 1,
        explanation: "SBO-COMMON stores shared metadata, company lists, and upgrade information.",
      },
      {
        id: "m2-q2",
        question: "Which account is used to log into the SAP Business One System Landscape Directory (SLD)?",
        options: ["sa", "B1SiteUser", "manager", "root"],
        correctIndex: 1,
        explanation: "B1SiteUser is the administrative account for the SLD Control Center.",
      },
    ],
  },
  {
    slug: "m3-creation-of-database",
    shortTitle: "M3 - Creation of Database",
    title: "M3 - Creation of Database",
    startDate: "August 07, 2026",
    endDate: "December 31, 2026",
    status: "OPEN",
    description:
      "Create a new company database in SAP Business One, configure localization, chart of accounts, and posting periods.",
    thumbnail: "/assets/lessons/m3.png",
    totalPages: 3,
    videoTitle: "Creating a New Company Database in SAP B1",
    videoDuration: "11:48",
    pages: [
      {
        pageNumber: 1,
        classification: "PUBLIC",
        headerTitle: "M3 - Creation of Database",
        product: "SAP Business One",
        version: "Module 3 – Lab Guide",
        title: "Creation of Company Database",
        subtitle: "Localization, Posting Periods & Chart of Accounts",
        sections: [
          {
            heading: "Creating a New Company",
            paragraphs: [
              "From the Choose Company screen, select New to launch the Create New Company wizard. Provide the Company Name, Database Name (no spaces), Localization, and Base Language.",
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        classification: "PUBLIC",
        headerTitle: "M3 - Creation of Database",
        product: "SAP Business One",
        version: "Module 3 – Lab Guide",
        title: "Defining Posting Periods",
        sections: [
          {
            heading: "Fiscal Year & Sub-Periods",
            paragraphs: [
              "Define the Posting Period Code, Period Name, Sub-Periods (Months), and Start of Fiscal Year before finalizing the database creation.",
            ],
          },
        ],
      },
      {
        pageNumber: 3,
        classification: "PUBLIC",
        headerTitle: "M3 - Creation of Database",
        product: "SAP Business One",
        version: "Module 3 – Lab Guide",
        title: "Chart of Accounts & Initial Login",
        sections: [
          {
            heading: "Default Superuser",
            paragraphs: [
              "Select a predefined Chart of Accounts template or User-Defined, then log in using the default superuser account (`manager`) to complete initial setup.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "m3-q1",
        question: "What is the default superuser username in a newly created SAP Business One company database?",
        options: ["admin", "superuser", "manager", "sapuser"],
        correctIndex: 2,
        explanation: "Every new SAP Business One company database ships with `manager` as the default superuser.",
      },
      {
        id: "m3-q2",
        question: "Which setting cannot be changed after a company database has been created and transactions posted?",
        options: ["Company Phone Number", "Localization", "Print Layout", "User Password"],
        correctIndex: 1,
        explanation: "Localization determines tax, accounting, and statutory rules and is locked after creation.",
      },
    ],
  },
  {
    slug: "m4-database-setup",
    shortTitle: "M4 - Database Setup",
    title: "M4 - Database Setup",
    startDate: "August 07, 2026",
    endDate: "December 31, 2026",
    status: "OPEN",
    description:
      "Configure Company Details, General Settings, Document Numbering, Users & Authorizations, and G/L Account Determination.",
    thumbnail: "/assets/lessons/m4.png",
    totalPages: 3,
    videoTitle: "Initial Database Setup & Administration",
    videoDuration: "15:12",
    pages: [
      {
        pageNumber: 1,
        classification: "PUBLIC",
        headerTitle: "M4 - Database Setup",
        product: "SAP Business One",
        version: "Module 4 – Lab Guide",
        title: "Database Setup & System Initialization",
        subtitle: "Company Details, General Settings & Numbering",
        sections: [
          {
            heading: "Administration > System Initialization",
            bullets: [
              "Company Details: Address, Tax ID, Local & System Currency",
              "General Settings: Display, Business Partner, Inventory & Pricing defaults",
              "Document Numbering: Configure series for Sales, Purchasing, and Journal Entries",
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        classification: "PUBLIC",
        headerTitle: "M4 - Database Setup",
        product: "SAP Business One",
        version: "Module 4 – Lab Guide",
        title: "Users & Authorizations",
        sections: [
          {
            heading: "Role-Based Access",
            paragraphs: [
              "Create standard user accounts under Administration > Setup > General > Users and assign granular module permissions under Authorizations.",
            ],
          },
        ],
      },
      {
        pageNumber: 3,
        classification: "PUBLIC",
        headerTitle: "M4 - Database Setup",
        product: "SAP Business One",
        version: "Module 4 – Lab Guide",
        title: "G/L Account Determination",
        sections: [
          {
            heading: "Automated Accounting Integration",
            paragraphs: [
              "Verify Sales, Purchasing, General, and Inventory G/L Account Determination mappings so marketing documents post accurately to the General Ledger.",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        id: "m4-q1",
        question: "Where in SAP Business One do you configure Local Currency and System Currency?",
        options: [
          "Modules > Financials > Chart of Accounts",
          "Administration > System Initialization > Company Details",
          "Modules > Sales > Sales Order",
          "Tools > Customization Tools",
        ],
        correctIndex: 1,
        explanation: "Currencies are configured under Administration > System Initialization > Company Details.",
      },
      {
        id: "m4-q2",
        question: "Which setup determines which G/L accounts are automatically credited or debited by Sales and Purchasing documents?",
        options: [
          "Document Numbering",
          "G/L Account Determination",
          "Posting Periods",
          "User Authorizations",
        ],
        correctIndex: 1,
        explanation: "G/L Account Determination maps business transactions to default General Ledger accounts.",
      },
    ],
  },
];

export const INITIAL_GRADES: GradeItem[] = [
  {
    id: "g-hrg",
    slug: "hardware-requirements-guide",
    topicName: "Hardware Requirements Guide",
    category: "Quiz Assessment",
    score: "/",
    rating: "",
  },
  {
    id: "g-m1",
    slug: "m1-installing-ms-sql-server",
    topicName: "Installing MS SQL Server",
    category: "Quiz Assessment",
    score: "9/10",
    rating: "94",
  },
  {
    id: "g-m2",
    slug: "m2-sap-installation",
    topicName: "SAP Installation",
    category: "Quiz Assessment",
    score: "0/0",
    rating: "",
  },
  {
    id: "g-m3",
    slug: "m3-creation-of-database",
    topicName: "Creation of Database",
    category: "Quiz Assessment",
    score: "0/0",
    rating: "",
  },
  {
    id: "g-m4",
    slug: "m4-database-setup",
    topicName: "Database Setup",
    category: "Quiz Assessment",
    score: "0/0",
    rating: "",
  },
];

export const INITIAL_PROGRESS: Record<string, { pagesRead: number; videoWatched: boolean }> = {
  "hardware-requirements-guide": { pagesRead: 14, videoWatched: false },
  "m1-installing-ms-sql-server": { pagesRead: 4, videoWatched: true },
  "m2-sap-installation": { pagesRead: 1, videoWatched: false },
  "m3-creation-of-database": { pagesRead: 0, videoWatched: false },
  "m4-database-setup": { pagesRead: 0, videoWatched: false },
};

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "instructor",
    senderName: "Cabarles, Axel Gabriel",
    text: "Welcome to IT302-WM SAP Business One! Please review the Hardware Requirements Guide before starting M1.",
    timestamp: "Oct 08, 9:00 AM",
  },
  {
    id: "msg-2",
    sender: "student",
    senderName: "NEIL ALFRED JAGORIN SIERRA",
    text: "Noted, Sir! I have finished reading the Hardware Requirements Guide and completed the M1 quiz.",
    timestamp: "Oct 09, 2:15 PM",
  },
];

export const INITIAL_COMMENTS: FeedbackComment[] = [
  {
    id: "fb-1",
    subject: "Hardware Requirements Guide Clarity",
    comment: "The sizing table for 1–10 concurrent users was very helpful for setting up my local VM.",
    createdAt: "Oct 10, 2026",
    author: "NEIL ALFRED JAGORIN SIERRA",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Quiz Graded: Installing MS SQL Server",
    detail: "You scored 9/10 (Rating: 94) on M1 Quiz Assessment.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "n-2",
    title: "Module Available: Hardware Requirements Guide",
    detail: "Open from October 08, 2026 to December 31, 2026.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: "n-3",
    title: "Message from Cabarles, Axel Gabriel",
    detail: "Welcome to IT302-WM SAP Business One!",
    time: "3 days ago",
    unread: false,
  },
];
