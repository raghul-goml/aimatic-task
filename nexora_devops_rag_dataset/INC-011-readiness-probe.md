---
document_id: INC-011
document_type: incident
service: inventory-service
component: inventory-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [inventory_service, readiness_probe_design, production, incident]
related_documents: [RB-003, RB-001, ARCH-006]
---

# Inventory 503 during database slowdown

**Document ID:** INC-011  
**Document Type:** Incident  
**Service:** inventory-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Readiness probe design. The readiness probe depended on a database query with an overly short timeout.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
The readiness probe depended on a database query with an overly short timeout.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to readiness probe design.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Readiness probe design** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Readiness probe design.

## Resolution
Probe behavior was separated from dependency health and validated.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR inventory-service
incident=INC-011
symptom=inventory 503 during database slowdown
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-003
- RB-001
- ARCH-006

## Keywords
inventory_service, readiness_probe_design, production, incident, Nexora Technologies, production, DevOps, SRE