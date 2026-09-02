---
document_id: RB-003
document_type: runbook
service: kubernetes
component: kubernetes
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [Service, EndpointSlice, HTTP 503, selector, targetPort]
related_documents: [RB-001, RB-004, SOP-005, ARCH-001, ARCH-006]
---

# Kubernetes Service and Endpoint Troubleshooting Runbook

**Document ID:** RB-003  
**Document Type:** Runbook  
**Service:** kubernetes  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Diagnose Services with missing endpoints or incorrect selectors/ports.

## Overview
A Service may exist while returning HTTP 503 because zero ready pods are registered as endpoints.

## Investigation
Inspect Service selectors, pod labels, EndpointSlices, `targetPort`, and readiness.
```text
kubectl -n nexora-prod get svc
kubectl -n nexora-prod describe svc api-gateway
kubectl -n nexora-prod get endpointslice
```
A selector mismatch, wrong port mapping, or failed readiness probe can remove all usable endpoints.

## Resolution / Verification
Correct the selector or port mapping through SOP-005, then confirm EndpointSlices contain ready addresses and an in-cluster request succeeds.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-001
- RB-004
- SOP-005
- ARCH-001
- ARCH-006

## Keywords
Service, EndpointSlice, HTTP 503, selector, targetPort, Nexora Technologies, production, DevOps, SRE