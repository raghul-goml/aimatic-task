---
document_id: INC-005
document_type: incident
service: order-service
component: order-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [order_service, slow_database_query, production, incident]
related_documents: [RB-005, RB-011, ARCH-005, SOP-004]
---

# Order latency from PostgreSQL pool exhaustion

**Document ID:** INC-005  
**Document Type:** Incident  
**Service:** order-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Slow database query. An unindexed reporting query held application connections for too long.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
An unindexed reporting query held application connections for too long.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to slow database query.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Slow database query** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Slow database query.

## Resolution
Query path was disabled, then an approved index change was deployed.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR order-service
incident=INC-005
symptom=order latency from postgresql pool exhaustion
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-005
- RB-011
- ARCH-005
- SOP-004

## Keywords
order_service, slow_database_query, production, incident, Nexora Technologies, production, DevOps, SRE