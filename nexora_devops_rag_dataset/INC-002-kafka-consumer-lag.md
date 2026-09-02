---
document_id: INC-002
document_type: incident
service: notification-service
component: notification-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [notification_service, resource_limit_misconfiguration, production, incident]
related_documents: [RB-007, RB-012, ARCH-004, MON-001]
---

# Payment notification delay

**Document ID:** INC-002  
**Document Type:** Incident  
**Service:** notification-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Resource limit misconfiguration. A throttled consumer processed high-volume Kafka partitions too slowly; lag reached 18,432.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
A throttled consumer processed high-volume Kafka partitions too slowly; lag reached 18,432.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to resource limit misconfiguration.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Resource limit misconfiguration** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Resource limit misconfiguration.

## Resolution
CPU allocation was corrected and consumer lag returned to baseline.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR notification-service
incident=INC-002
symptom=payment notification delay
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-007
- RB-012
- ARCH-004
- MON-001

## Keywords
notification_service, resource_limit_misconfiguration, production, incident, Nexora Technologies, production, DevOps, SRE