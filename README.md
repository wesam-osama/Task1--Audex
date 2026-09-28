#  Audex App — Cloud-Native Containerized Infrastructure

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_ECS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

A modern, production-ready, microservices-based web application containerized using multi-stage Docker builds, Nginx SPA optimization, strict security resource quotas, native automated healthchecks, and SSH-free cloud deployment capability.

---

##  System Architecture

The application is decoupled into three isolated, containerized microservices managed via Docker Compose:

              ┌─────────────────────────────────────────┐
              │              User Browser               │
              └────────────────────┬────────────────────┘
                                   │ Port :80
                                   ▼
              ┌─────────────────────────────────────────┐
              │            Nginx Web Server             │
              │        (React SPA Static Assets)        │
              └────────────────────┬────────────────────┘
                                   │ Internal Network
                                   ▼
              ┌─────────────────────────────────────────┐
              │         Node.js Express API             │
              │       (Backend Logic & Routes)          │
              └────────────────────┬────────────────────┘
                                   │ Port :27017
                                   ▼
              ┌─────────────────────────────────────────┐
              │            MongoDB Database             │
              │          (Persistent Volume)            │
              └─────────────────────────────────────────┘

---

##  Key Engineering Features

* **Multi-Stage Alpine Builds:** Decouples build-time dependencies from runtime containers using `node:20-alpine` and `node:18-alpine` builder stages, stripping image footprint down from **~1GB to ~50MB** for optimized delivery and reduced attack surface.
* **Production Nginx Routing:** Serves compiled static assets via Nginx with custom fallback configuration directing all client-side routes to `index.html`, eliminating 404 errors on browser refresh for React SPAs.
* **AI Security Audits & Resource Hardening:** Hardened following **Docker Gordon AI** security audits. Enforces strict container quotas (`0.50 CPU`, `256M/512M Memory`) to insulate fault domains and prevent Denial of Service (DoS) / resource exhaustion.
* **Self-Healing Resilience:** Built-in health checks (`healthcheck.js`) probe endpoints every 30 seconds. Paired with `restart: unless-stopped` policies, unhealthy containers automatically recover with zero human intervention.
* **SSH-Free Cloud Contexts:** Immutable OCI images stored on Docker Hub enable seamless, SSH-free deployments directly to serverless cloud engines including **AWS ECS** and **Azure ACI**.

---

##  Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, Nginx (`nginx:alpine`)
* **Backend:** Node.js, Express.js (`node:18-alpine`)
* **Database:** MongoDB
* **Orchestration & DevOps:** Docker, Docker Compose, Docker Hub, AWS ECS, Azure ACI

---

##  Repository Structure

```text
.
├── docker-compose.yml           # Declarative multi-container orchestration
├── frontend/
│   ├── Dockerfile               # Multi-stage build (Vite + Nginx)
│   ├── nginx.conf               # SPA routing & fallback configuration
│   └── src/                     # React source code
├── backend/
│   ├── Dockerfile               # Multi-stage build (Node.js API)
│   ├── healthcheck.js           # Custom HTTP health check script
│   └── src/                     # Express application code
└── README.md                    # Project documentation
🚦 Getting Started (Local Development)PrerequisitesEnsure you have the following installed on your machine:Docker Desktop (v20.10+)Git1. Clone the RepositoryBashgit clone [https://github.com/wessamosama/audex-app.git](https://github.com/wessamosama/audex-app.git)
cd audex-app
2. Configure Environment VariablesCreate a .env file in the root directory:Code snippetPORT=5000
MONGO_URI=mongodb://mongo:27017/audex_db
NODE_ENV=production
3. Build & Run ContainersLaunch the complete multi-container stack in detached mode:Bashdocker compose up -d --build
4. Verify Active Services & Health StatusCheck container status and automated healthchecks:Bashdocker compose ps
Access the application components:Frontend Application: http://localhost:80Backend API Endpoint: http://localhost:5000/health
Security & Resilience ControlsControlImplementationOperational BenefitLeast PrivilegeNon-root runtime & Docker Gordon AI auditMinimizes surface vulnerabilitiesDoS ProtectionHard Caps: 0.5 CPU / 256M MemoryPrevents container resource starvationHealth CheckHTTP Ping /health every 30sProactive detection of API failureSelf-Healingrestart: unless-stopped policyAutomatic recovery without downtime☁️ Cloud Deployment (Docker Contexts)Deploy directly to AWS ECS or Azure ACI without standard SSH server management:Bash# 1. Create a remote cloud context
docker context create ecs aws-audex-context

# 2. Switch active CLI target to cloud
docker context use aws-audex-context

# 3. Deploy stack directly to AWS ECS
docker compose up
 Prepared by 
Wesam Osama Ali - DevOps & Software 
