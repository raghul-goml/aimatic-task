---
document_id: INC-010
document_type: incident
service: user-service
component: user-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [user_service, non-idempotent_migration, production, incident]
related_documents: [SOP-004, RB-009, RB-010, ARCH-005]
---

# Production migration failed

**Document ID:** INC-010  
**Document Type:** Incident  
**Service:** user-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Non-idempotent migration. Migration assumed an index state that differed from production and could not safely resume.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
Migration assumed an index state that differed from production and could not safely resume.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to non-idempotent migration.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Non-idempotent migration** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Non-idempotent migration.

## Resolution
Deployment was stopped; a corrected migration was rehearsed and applied.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR user-service
incident=INC-010
symptom=production migration failed
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- SOP-004
- RB-009
- RB-010
- ARCH-005

## Keywords
user_service, non-idempotent_migration, production, incident, Nexora Technologies, production, DevOps, SRE