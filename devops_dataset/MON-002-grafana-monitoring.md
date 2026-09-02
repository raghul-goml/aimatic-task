---
document_id: MON-002
document_type: monitoring
service: grafana
component: grafana
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [monitoring, Prometheus, Grafana, metrics, alerts]
related_documents: [MON-001, MON-004, RB-011, RB-012]
---

# Grafana Monitoring Guide

**Document ID:** MON-002  
**Document Type:** Monitoring  
**Service:** grafana  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Review request throughput, p50/p95/p99 latency, HTTP error rate, CPU, memory, restarts, PostgreSQL connections, Redis connections, and Kafka lag.

## Core Metrics
CPU usage, memory usage, request latency, HTTP error rate, pod restart count, Kafka consumer lag, PostgreSQL connection count, Redis connection count, and request throughput.

## Investigation
Compare current values with baseline and deployment timeline. Latency plus PostgreSQL connection growth suggests database pressure; restarts plus memory growth suggests application memory pressure.

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
- MON-004
- RB-011
- RB-012

## Keywords
monitoring, Prometheus, Grafana, metrics, alerts, Nexora Technologies, production, DevOps, SRE