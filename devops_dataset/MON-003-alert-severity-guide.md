---
document_id: MON-003
document_type: monitoring
service: platform
component: platform
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [monitoring, Prometheus, Grafana, metrics, alerts]
related_documents: [SOP-003, MON-001]
---

# Production Alert Severity Guide

**Document ID:** MON-003  
**Document Type:** Monitoring  
**Service:** platform  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Define operational severity and escalation.

## Core Metrics
CPU usage, memory usage, request latency, HTTP error rate, pod restart count, Kafka consumer lag, PostgreSQL connection count, Redis connection count, and request throughput.

## Investigation
SEV-1 is broad outage, major data integrity risk, or critical security impact. SEV-2 is significant core-service customer impact. SEV-3 is limited or internal degradation.

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
- SOP-003
- MON-001

## Keywords
monitoring, Prometheus, Grafana, metrics, alerts, Nexora Technologies, production, DevOps, SRE