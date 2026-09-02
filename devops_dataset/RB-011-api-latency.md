---
document_id: RB-011
document_type: runbook
service: api-gateway
component: api-gateway
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [latency, p95, p99, throughput, bottleneck]
related_documents: [RB-005, RB-006, MON-002, MON-004, INC-005]
---

# API Latency Troubleshooting Runbook

**Document ID:** RB-011  
**Document Type:** Runbook  
**Service:** api-gateway  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Investigate elevated p50/p95/p99 API latency across gateway, services, and dependencies.

## Overview
Check request throughput, p50/p95/p99, HTTP error rate, CPU, memory, PostgreSQL connections, Redis latency, and Kafka lag.

## Investigation
A high p95 with normal p50 often means a subset of requests is slow. Correlate latency with deployment time and dependency metrics.
```text
api_latency_p95=2.8s
postgres_connections=91
http_5xx_rate=3.2%
request_rate=420rps
```

## Resolution / Verification
Address the narrowest confirmed bottleneck. Increasing timeouts should not be the first response because it can increase resource pressure.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-005
- RB-006
- MON-002
- MON-004
- INC-005

## Keywords
latency, p95, p99, throughput, bottleneck, Nexora Technologies, production, DevOps, SRE