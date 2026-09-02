---
document_id: ARCH-004
document_type: architecture
service: kafka
component: kafka
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [architecture, kafka, dependencies, monitoring]
related_documents: [ARCH-002, ARCH-005, RB-007, INC-002, INC-008]
---

# Kafka Event Architecture

**Document ID:** ARCH-004  
**Document Type:** Architecture  
**Service:** kafka  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Topics include `payment-events`, `order-events`, and `user-events`. Payment Service produces payment events; Notification and Reporting consume them. Order Service produces order events; Inventory and Reporting consume them. Partition count limits useful consumer parallelism.

## Components
Kubernetes Deployments, Services, NGINX, API Gateway, PostgreSQL, Redis, Kafka, Prometheus, Grafana, and application workloads.

## Responsibilities
Topics include `payment-events`, `order-events`, and `user-events`. Payment Service produces payment events; Notification and Reporting consume them. Order Service produces order events; Inventory and Reporting consume them. Partition count limits useful consumer parallelism.

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
- ARCH-005
- RB-007
- INC-002
- INC-008

## Keywords
architecture, kafka, dependencies, monitoring, Nexora Technologies, production, DevOps, SRE