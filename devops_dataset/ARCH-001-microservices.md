---
document_id: ARCH-001
document_type: architecture
service: platform
component: platform
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [architecture, platform, dependencies, monitoring]
related_documents: [ARCH-002, ARCH-003, ARCH-004, ARCH-005, ARCH-006, RB-004]
---

# Overall Microservices Architecture

**Document ID:** ARCH-001  
**Document Type:** Architecture  
**Service:** platform  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
NGINX → API Gateway → business microservices. HTTP/JSON is used synchronously; Kafka carries asynchronous events. PostgreSQL stores durable relational state and Redis stores cache, session, idempotency, and short-lived coordination data.

## Components
Kubernetes Deployments, Services, NGINX, API Gateway, PostgreSQL, Redis, Kafka, Prometheus, Grafana, and application workloads.

## Responsibilities
NGINX → API Gateway → business microservices. HTTP/JSON is used synchronously; Kafka carries asynchronous events. PostgreSQL stores durable relational state and Redis stores cache, session, idempotency, and short-lived coordination data.

## Dependencies
Service dependencies must remain consistent across the dataset. Payment depends on PostgreSQL, Redis, and Kafka; Authentication depends on PostgreSQL and Redis.

## Communication Flow
External HTTPS → NGINX → API Gateway → service. Asynchronous workflows use Kafka topics and consumer groups.

## Failure Points
Zero ready endpoints, dependency timeouts, connection pool exhaustion, consumer lag, resource pressure, schema incompatibility, and configuration drift.

## Monitoring Points
HTTP error rate, p95/p99 latency, CPU, memory, restart count, PostgreSQL connections, Redis connections, Kafka consumer lag, and rollout status.

## Common Failure Scenarios
HTTP 503 with healthy-running pods can indicate failed readiness. HTTP 502 can indicate upstream port/connectivity problems. High lag can indicate stalled or throttled consumers.

## Related Documents
- ARCH-002
- ARCH-003
- ARCH-004
- ARCH-005
- ARCH-006
- RB-004

## Keywords
architecture, platform, dependencies, monitoring, Nexora Technologies, production, DevOps, SRE