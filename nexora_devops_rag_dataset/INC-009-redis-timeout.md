---
document_id: INC-009
document_type: incident
service: authentication-service
component: authentication-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [authentication_service, stale_dns_cache, production, incident]
related_documents: [RB-006, RB-002, ARCH-003]
---

# Authentication Redis timeout after maintenance

**Document ID:** INC-009  
**Document Type:** Incident  
**Service:** authentication-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Stale DNS cache. A Redis failover changed the active endpoint while one application pool retained stale DNS information.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
A Redis failover changed the active endpoint while one application pool retained stale DNS information.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to stale dns cache.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Stale DNS cache** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Stale DNS cache.

## Resolution
Affected pods were restarted and failover handling improved.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR authentication-service
incident=INC-009
symptom=authentication redis timeout after maintenance
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-006
- RB-002
- ARCH-003

## Keywords
authentication_service, stale_dns_cache, production, incident, Nexora Technologies, production, DevOps, SRE