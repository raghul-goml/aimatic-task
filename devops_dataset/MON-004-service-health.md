---
document_id: MON-004
document_type: monitoring
service: platform
component: platform
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [monitoring, Prometheus, Grafana, metrics, alerts]
related_documents: [MON-001, MON-002, ARCH-001, ARCH-006]
---

# Service Health Monitoring Guide

**Document ID:** MON-004  
**Document Type:** Monitoring  
**Service:** platform  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Define consistent service health across availability, latency, reliability, capacity, async processing, and deployment health.

## Core Metrics
CPU usage, memory usage, request latency, HTTP error rate, pod restart count, Kafka consumer lag, PostgreSQL connection count, Redis connection count, and request throughput.

## Investigation
A service is healthy only when application success metrics, infrastructure metrics, dependency signals, and rollout state are normal. Running pods alone do not prove availability.

## Example Metric Snapshot
```text
http_5xx_rate=3.2%
api_latency_p95=2.8s
pod_restart_count=4
kafka_consumer_lag=18432
postgres_connections=91
redis_connections=148
request_rate=420rps
```

## Escalation
Follow MON-003 severity guidance and SOP-003 incident response.

## Related Documents
- MON-001
- MON-002
- ARCH-001
- ARCH-006

## Keywords
monitoring, Prometheus, Grafana, metrics, alerts, Nexora Technologies, production, DevOps, SRE