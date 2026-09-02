---
document_id: INC-006
document_type: incident
service: reporting-service
component: reporting-service
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [reporting_service, memory_leak, production, incident]
related_documents: [RB-012, RB-010, MON-002, SOP-001]
---

# Reporting pods OOMKilled

**Document ID:** INC-006  
**Document Type:** Incident  
**Service:** reporting-service  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Memory leak. Report aggregation retained intermediate objects, causing memory to rise over several hours.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
Report aggregation retained intermediate objects, causing memory to rise over several hours.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to memory leak.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Memory leak** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Memory leak.

## Resolution
Release was rolled back and the aggregation implementation fixed.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR reporting-service
incident=INC-006
symptom=reporting pods oomkilled
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-012
- RB-010
- MON-002
- SOP-001

## Keywords
reporting_service, memory_leak, production, incident, Nexora Technologies, production, DevOps, SRE