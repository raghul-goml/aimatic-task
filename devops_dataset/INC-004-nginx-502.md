---
document_id: INC-004
document_type: incident
service: api-gateway
component: api-gateway
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [api_gateway, nginx_configuration_error, production, incident]
related_documents: [RB-004, RB-003, ARCH-001, SOP-005]
---

# NGINX 502 after port change

**Document ID:** INC-004  
**Document Type:** Incident  
**Service:** api-gateway  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Historical synthetic incident report used for operational retrieval and incident reasoning.

## Summary
**Root cause:** NGINX configuration error. Kubernetes Service targetPort changed to 8081 while the gateway still used 8080.

## Customer Impact
A subset of production traffic or asynchronous processing was degraded. No real customer data or credentials are represented.

## Symptoms
Kubernetes Service targetPort changed to 8081 while the gateway still used 8080.

## Detection Method
Prometheus/Grafana alert correlation with application logs and deployment timeline.

## Timeline
- 10:02 UTC: change began.
- 10:05 UTC: first abnormal metric observed.
- 10:07 UTC: alert fired.
- 10:10 UTC: SEV-2 declared.
- 10:14 UTC: investigation narrowed to nginx configuration error.
- 10:18 UTC: mitigation completed.
- 10:22 UTC: customer metrics returned toward baseline.

## Investigation
The on-call engineer correlated metrics, logs, Kubernetes state, and the recent change. The investigation identified **NGINX configuration error** as the primary cause rather than treating the first visible symptom as the root cause.

## Root Cause
NGINX configuration error.

## Resolution
Upstream port was corrected and NGINX reloaded.

## Recovery
Service health was verified using successful requests, normal error rate and latency, stable pods, and dependency metrics where applicable.

## Preventive Actions
Add targeted alerting, pre-deployment validation, production-like testing, and a documented owner for the affected control.

## Relevant Logs/Errors
```text
ERROR api-gateway
incident=INC-004
symptom=nginx 502 after port change
environment=nexora-prod
```

## Lessons Learned
Capture evidence before restarting workloads; correlate application, infrastructure, and dependency signals; prefer the smallest reversible mitigation.

## Related Documents
- RB-004
- RB-003
- ARCH-001
- SOP-005

## Keywords
api_gateway, nginx_configuration_error, production, incident, Nexora Technologies, production, DevOps, SRE