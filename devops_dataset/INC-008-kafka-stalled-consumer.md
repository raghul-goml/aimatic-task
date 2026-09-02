---
document_id: INC-008
document_type: incident
service: order-service
component: order-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [order_service, schema_incompatibility, production, incident]
related_documents: [RB-007, ARCH-004, SOP-001]
---

# Order events stalled

**Document ID:** INC-008  
**Document Type:** Incident  
**Service:** order-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Schema incompatibility. A producer added a non-compatible event field without coordinating consumer compatibility.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
A producer added a non-compatible event field without coordinating consumer compatibility.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to schema incompatibility.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Schema incompatibility** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Schema incompatibility.

## Resolution
Producer was rolled back and compatibility checks were added.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR order-service
incident=INC-008
symptom=order events stalled
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-007
- ARCH-004
- SOP-001

## Keywords
order_service, schema_incompatibility, production, incident, Nexora Technologies, production, DevOps, SRE