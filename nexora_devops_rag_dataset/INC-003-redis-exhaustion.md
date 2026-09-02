---
document_id: INC-003
document_type: incident
service: payment-service
component: payment-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [payment_service, redis_connection_leak, production, incident]
related_documents: [RB-006, RB-010, ARCH-002, MON-001]
---

# Payment 503 from Redis pool exhaustion

**Document ID:** INC-003  
**Document Type:** Incident  
**Service:** payment-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Redis connection leak. A release created clients without returning them to the shared pool; Redis itself remained healthy.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
A release created clients without returning them to the shared pool; Redis itself remained healthy.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to redis connection leak.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Redis connection leak** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Redis connection leak.

## Resolution
Release was rolled back and connection lifecycle was corrected.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR payment-service
incident=INC-003
symptom=payment 503 from redis pool exhaustion
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-006
- RB-010
- ARCH-002
- MON-001

## Keywords
payment_service, redis_connection_leak, production, incident, Nexora Technologies, production, DevOps, SRE