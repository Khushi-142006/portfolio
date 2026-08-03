const projectsData = [
  {
    id: "novasearch",
    title: "NovaSearch - AI Semantic Search Engine",
    description: "A production-grade semantic search platform featuring dense vector search, Retrieval-Augmented Generation (RAG), and hybrid keyword-vector retrieval. Handles multi-million document indexes with sub-50ms query latency.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "FastAPI", "Pinecone", "OpenAI API", "Redis", "Docker"],
    githubUrl: "https://github.com/alexcarter/novasearch",
    liveUrl: "https://novasearch-demo.alexcarter.dev",
    status: "Production",
    architecture: ["Microservices", "Vector Search", "Hybrid Retrieval"],
    category: "AI/ML"
  },
  {
    id: "helios",
    title: "Helios - Distributed Message Broker",
    description: "A high-performance, event-driven distributed message broker written in Go and Node.js. Supports publish-subscribe, message persistence, and automatic partition rebalancing, achieving 100k+ messages/sec throughput.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    technologies: ["Node.js", "Go", "Protocol Buffers", "gRPC", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/alexcarter/helios",
    liveUrl: "https://helios-stats.alexcarter.dev",
    status: "Beta",
    architecture: ["Event-Driven", "Distributed Systems", "gRPC"],
    category: "Backend"
  },
  {
    id: "velopay",
    title: "VeloPay - Real-time Payment Ledger",
    description: "A double-entry bookkeeping and transaction ledger engine designed for high-concurrency payment networks. Built with transactional safety, strict consistency, and idempotent processing.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "Jest", "GitHub Actions"],
    githubUrl: "https://github.com/alexcarter/velopay",
    liveUrl: "https://velopay.alexcarter.dev",
    status: "Completed",
    architecture: ["CQRS", "Double-Entry Ledger", "Event Sourcing"],
    category: "Backend"
  },
  {
    id: "lumina",
    title: "Lumina - Collaborative Design Workspace",
    description: "A browser-based collaborative visual design whiteboard using Yjs CRDTs for real-time multiplayer editing, canvas-based rendering, dynamic vector calculations, and presence cursors.",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "TypeScript", "WebSockets", "Canvas API", "Node.js", "Yjs"],
    githubUrl: "https://github.com/alexcarter/lumina",
    liveUrl: "https://lumina.alexcarter.dev",
    status: "Production",
    architecture: ["Real-time Sync", "CRDTs", "Client-side Rendering"],
    category: "Frontend"
  },
  {
    id: "zenith",
    title: "Zenith - Cloud Cost Analytics Dashboard",
    description: "An enterprise SaaS platform integrating with AWS and GCP APIs to aggregate usage logs, detect cost anomalies, and generate actionable recommendations. Saved beta users over 30% in idle capacity.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Vite", "Node.js", "AWS SDK", "Chart.js", "OAuth2.0"],
    githubUrl: "https://github.com/alexcarter/zenith",
    liveUrl: "https://zenith-cloud.alexcarter.dev",
    status: "Completed",
    architecture: ["SaaS Architecture", "Data Visualization", "API Aggregator"],
    category: "Cloud/DevOps"
  },
  {
    id: "aether",
    title: "Aether - Edge Mesh Daemon",
    description: "A lightweight background daemon designed for resource-constrained IoT devices to form peer-to-peer ad-hoc networks, enabling self-healing communications and local-first data store replication.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    technologies: ["Node.js", "Libp2p", "SQLite", "protobuf", "Raspberry Pi"],
    githubUrl: "https://github.com/alexcarter/aether",
    liveUrl: "https://aether-mesh.alexcarter.dev",
    status: "Archived",
    architecture: ["P2P Mesh", "Local-First", "Embedded Daemon"],
    category: "Backend"
  },
  {
    id: "kronos",
    title: "Kronos - Distributed Job Scheduler",
    description: "A highly-available, distributed cron execution service using etcd for leader election and task distribution. Guarantees at-least-once execution and provides detailed telemetry dashboards.",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80",
    technologies: ["Node.js", "Express", "etcd", "Redis", "Prometheus", "Grafana"],
    githubUrl: "https://github.com/alexcarter/kronos",
    liveUrl: "https://kronos-dashboard.alexcarter.dev",
    status: "Production",
    architecture: ["Leader Election", "Distributed Cron", "Telemetry"],
    category: "Backend"
  },
  {
    id: "iris",
    title: "Iris - Real-time Vision Inspection Pipeline",
    description: "An automated visual quality control system utilizing fine-tuned YOLO object detection models. Streams live video frames via WebSockets, run inference, and triggers GPIO alerts in under 20ms.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Python", "PyTorch", "YOLOv8", "WebSockets", "FastAPI"],
    githubUrl: "https://github.com/alexcarter/iris",
    liveUrl: "https://iris-vision.alexcarter.dev",
    status: "Beta",
    architecture: ["AI Computer Vision", "Real-time Streams", "Edge Pipeline"],
    category: "AI/ML"
  }
];

export default projectsData;
