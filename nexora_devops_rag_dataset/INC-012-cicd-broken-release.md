---
document_id: INC-012
document_type: incident
service: api-gateway
component: api-gateway
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [api_gateway, broken_ci/cd_deployment, production, incident]
related_documents: [RB-009, RB-010, SOP-001, SOP-002]
---

# Wrong image deployed by CI/CD

**Document ID:** INC-012  
**Document Type:** Incident  
**Service:** api-gateway  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** Broken CI/CD deployment. A mutable `latest` image tag allowed an unintended artifact to reach production.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
A mutable `latest` image tag allowed an unintended artifact to reach production.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to broken ci/cd deployment.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **Broken CI/CD deployment** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
Broken CI/CD deployment.

## Resolution
Previous immutable image digest was restored and promotion was changed to digest-based deployment.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR api-gateway
incident=INC-012
symptom=wrong image deployed by ci/cd
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-009
- RB-010
- SOP-001
- SOP-002

## Keywords
api_gateway, broken_ci/cd_deployment, production, incident, Nexora Technologies, production, DevOps, SRE