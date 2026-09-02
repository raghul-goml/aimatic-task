# Nexora Technologies — Enterprise DevOps RAG Dataset

Synthetic internal operational knowledge base for FAISS + embeddings + MiniMax-M2.5 + FastAPI.
All infrastructure, logs, identifiers, and hostnames are synthetic.

| ID | Filename | Type | Service | Description | Related Documents |
|---|---|---|---|---|---|
| RB-001 | `RB-001-kubernetes-pod-troubleshooting.md` | Runbook | kubernetes | Diagnose unhealthy Kubernetes pods using status, events, logs, probes, resources, and dependencies. | RB-002, RB-003, RB-009, RB-010, ARCH-006 |
| RB-002 | `RB-002-crashloopbackoff.md` | Runbook | kubernetes | Troubleshoot containers that repeatedly start and exit. | RB-001, RB-005, RB-006, RB-012, SOP-001 |
| RB-003 | `RB-003-kubernetes-service-endpoints.md` | Runbook | kubernetes | Diagnose Services with missing endpoints or incorrect selectors/ports. | RB-001, RB-004, SOP-005, ARCH-001, ARCH-006 |
| RB-004 | `RB-004-http-502-503.md` | Runbook | nginx | Troubleshoot HTTP 502 Bad Gateway and HTTP 503 Service Unavailable responses. | RB-003, RB-005, RB-006, RB-009, ARCH-001 |
| RB-005 | `RB-005-postgresql-connectivity.md` | Runbook | postgresql | Diagnose PostgreSQL connection failures, timeouts, and connection pool exhaustion. | RB-009, ARCH-005, SOP-004, INC-005 |
| RB-006 | `RB-006-redis-connection.md` | Runbook | redis | Troubleshoot Redis connection failures and client connection exhaustion. | RB-002, RB-010, ARCH-002, INC-003, INC-009 |
| RB-007 | `RB-007-kafka-consumer-lag.md` | Runbook | kafka | Troubleshoot Kafka consumer lag, stalled consumers, partition imbalance, and slow processing. | RB-002, ARCH-004, MON-001, INC-002, INC-008 |
| RB-008 | `RB-008-docker-container-troubleshooting.md` | Runbook | docker | Diagnose container build, startup, entrypoint, environment, and port failures. | RB-009, SOP-001, INC-012 |
| RB-009 | `RB-009-deployment-failure.md` | Runbook | ci-cd | Diagnose failed Kubernetes deployments and determine whether to continue, pause, or roll back. | RB-001, RB-002, RB-010, SOP-001, INC-001, INC-012 |
| RB-010 | `RB-010-production-rollback.md` | Runbook | kubernetes | Safely return a production workload to a known-good release. | RB-009, SOP-002, SOP-003, INC-001, INC-012 |
| RB-011 | `RB-011-api-latency.md` | Runbook | api-gateway | Investigate elevated p50/p95/p99 API latency across gateway, services, and dependencies. | RB-005, RB-006, MON-002, MON-004, INC-005 |
| RB-012 | `RB-012-high-cpu-memory.md` | Runbook | kubernetes | Investigate CPU saturation, memory pressure, throttling, and OOMKilled containers. | RB-001, RB-002, RB-009, MON-002, INC-006 |
| INC-001 | `INC-001-payment-503.md` | Incident | payment-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-003, RB-009, RB-010, ARCH-002, SOP-001 |
| INC-002 | `INC-002-kafka-consumer-lag.md` | Incident | notification-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-007, RB-012, ARCH-004, MON-001 |
| INC-003 | `INC-003-redis-exhaustion.md` | Incident | payment-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-006, RB-010, ARCH-002, MON-001 |
| INC-004 | `INC-004-nginx-502.md` | Incident | api-gateway | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-004, RB-003, ARCH-001, SOP-005 |
| INC-005 | `INC-005-postgres-pool.md` | Incident | order-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-005, RB-011, ARCH-005, SOP-004 |
| INC-006 | `INC-006-memory-leak.md` | Incident | reporting-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-012, RB-010, MON-002, SOP-001 |
| INC-007 | `INC-007-certificate-expiry.md` | Incident | authentication-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-001, SOP-003, MON-001, ARCH-003 |
| INC-008 | `INC-008-kafka-stalled-consumer.md` | Incident | order-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-007, ARCH-004, SOP-001 |
| INC-009 | `INC-009-redis-timeout.md` | Incident | authentication-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-006, RB-002, ARCH-003 |
| INC-010 | `INC-010-migration-failure.md` | Incident | user-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | SOP-004, RB-009, RB-010, ARCH-005 |
| INC-011 | `INC-011-readiness-probe.md` | Incident | inventory-service | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-003, RB-001, ARCH-006 |
| INC-012 | `INC-012-cicd-broken-release.md` | Incident | api-gateway | Historical synthetic incident report used for operational retrieval and incident reasoning. | RB-009, RB-010, SOP-001, SOP-002 |
| ARCH-001 | `ARCH-001-microservices.md` | Architecture | platform | NGINX → API Gateway → business microservices. HTTP/JSON is used synchronously; Kafka carries asynchronous events. PostgreSQL stores durable relational state and Redis stores cache, session, idempotency, and short-lived coordination data. | ARCH-002, ARCH-003, ARCH-004, ARCH-005, ARCH-006, RB-004 |
| ARCH-002 | `ARCH-002-payment-service.md` | Architecture | payment-service | Payment Service validates requests, stores payment state in PostgreSQL, uses Redis for idempotency and short-lived state, and publishes `payment-events` to Kafka. Redis failure can affect synchronous payment availability; Kafka failure can delay downstream notifications. | ARCH-001, ARCH-004, ARCH-005, RB-005, RB-006, INC-003 |
| ARCH-003 | `ARCH-003-authentication.md` | Architecture | authentication-service | Authentication Service uses PostgreSQL for identity data and Redis for session/cache state. API Gateway calls it synchronously. Internal TLS certificates protect secure dependencies. | ARCH-001, ARCH-005, RB-006, INC-007, INC-009 |
| ARCH-004 | `ARCH-004-kafka-events.md` | Architecture | kafka | Topics include `payment-events`, `order-events`, and `user-events`. Payment Service produces payment events; Notification and Reporting consume them. Order Service produces order events; Inventory and Reporting consume them. Partition count limits useful consumer parallelism. | ARCH-002, ARCH-005, RB-007, INC-002, INC-008 |
| ARCH-005 | `ARCH-005-database.md` | Architecture | postgresql | Nexora uses PostgreSQL with service-owned logical schemas. Each service uses a bounded connection pool. Total application pool capacity must leave headroom for administrative and migration sessions. | ARCH-002, ARCH-003, RB-005, SOP-004, INC-005, INC-010 |
| ARCH-006 | `ARCH-006-kubernetes-infrastructure.md` | Architecture | kubernetes | Each microservice runs as a Deployment with multiple replicas in namespace `nexora-prod`. Services provide discovery, EndpointSlices contain ready backends, and NGINX routes external traffic. readinessProbe controls traffic eligibility while livenessProbe controls restart behavior. | ARCH-001, RB-001, RB-003, RB-012, INC-011 |
| SOP-001 | `SOP-001-production-deployment.md` | SOP | all-services | Approved change, tested build, immutable image digest, rollback revision, monitoring dashboard, and owner. | RB-009, RB-010, SOP-002, MON-003 |
| SOP-002 | `SOP-002-production-rollback.md` | SOP | all-services | Incident approval, known-good revision, captured evidence, and communication. | RB-010, SOP-001, SOP-003 |
| SOP-003 | `SOP-003-incident-response.md` | SOP | platform | Define incident command, triage, communication, recovery, and follow-up. | MON-003, RB-001, RB-010 |
| SOP-004 | `SOP-004-database-change.md` | SOP | postgresql | Control production schema changes and migrations. | ARCH-005, INC-005, INC-010 |
| SOP-005 | `SOP-005-kubernetes-change.md` | SOP | kubernetes | Control production Kubernetes configuration changes. | ARCH-006, RB-003, RB-009, RB-012 |
| SOP-006 | `SOP-006-emergency-access.md` | SOP | platform | Provide time-bound emergency access while preserving auditability. | SOP-003, SOP-005, RB-001 |
| MON-001 | `MON-001-prometheus-alerts.md` | Monitoring | prometheus | Interpret alerts for HTTP 5xx, API latency, pod restarts, Kafka lag, PostgreSQL connections, and Redis connections. | RB-004, RB-007, RB-005, RB-006, MON-002, MON-003 |
| MON-002 | `MON-002-grafana-monitoring.md` | Monitoring | grafana | Review request throughput, p50/p95/p99 latency, HTTP error rate, CPU, memory, restarts, PostgreSQL connections, Redis connections, and Kafka lag. | MON-001, MON-004, RB-011, RB-012 |
| MON-003 | `MON-003-alert-severity-guide.md` | Monitoring | platform | Define operational severity and escalation. | SOP-003, MON-001 |
| MON-004 | `MON-004-service-health.md` | Monitoring | platform | Define consistent service health across availability, latency, reliability, capacity, async processing, and deployment health. | MON-001, MON-002, ARCH-001, ARCH-006 |

## RAG Ingestion Notes
- Preserve YAML front matter as chunk metadata.
- Split Markdown by H2/H3 headings, keeping document_id and related_documents on every chunk.
- Store filename, document_type, service, severity, tags, and related_documents as FAISS metadata.
- Cross-document references are intentional for multi-hop retrieval.

## Evaluation Questions
1. Why is the payment service returning 503 after deployment?
2. Have we experienced Redis connection failures before?
3. How do I safely roll back a Kubernetes deployment?
4. Which services depend on Kafka?
5. What metrics should I check when API latency increases?
6. What is the difference between CrashLoopBackOff and ImagePullBackOff?
7. Which incident involved database connection exhaustion?
8. Payment returns 503 but pods are healthy. What should I check?
9. How can Redis connection exhaustion be prevented?
10. Which previous incident was caused by a readiness probe design?