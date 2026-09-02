---
document_id: MON-001
document_type: monitoring
service: prometheus
component: prometheus
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [monitoring, Prometheus, Grafana, metrics, alerts]
related_documents: [RB-004, RB-007, RB-005, RB-006, MON-002, MON-003]
---

# Prometheus Alert Runbook

**Document ID:** MON-001  
**Document Type:** Monitoring  
**Service:** prometheus  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Interpret alerts for HTTP 5xx, API latency, pod restarts, Kafka lag, PostgreSQL connections, and Redis connections.

## Core Metrics
CPU usage, memory usage, request latency, HTTP error rate, pod restart count, Kafka consumer lag, PostgreSQL connection count, Redis connection count, and request throughput.

## Investigation
Correlate the alert with Grafana, recent deployments, logs, and the relevant runbook. Alerts are signals, not proof of root cause.

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
- RB-004
- RB-007
- RB-005
- RB-006
- MON-002
- MON-003

## Keywords
monitoring, Prometheus, Grafana, metrics, alerts, Nexora Technologies, production, DevOps, SRE