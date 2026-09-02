---
document_id: RB-010
document_type: runbook
service: kubernetes
component: kubernetes
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [rollback, rollout undo, known-good, production]
related_documents: [RB-009, SOP-002, SOP-003, INC-001, INC-012]
---

# Production Rollback Runbook

**Document ID:** RB-010  
**Document Type:** Runbook  
**Service:** kubernetes  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Safely return a production workload to a known-good release.

## Overview
Use when a release causes active customer impact and a known-good revision exists.

## Investigation
Capture incident evidence and approval. Identify the last known-good revision:
```text
kubectl -n nexora-prod rollout history deployment/payment-service
kubectl -n nexora-prod rollout undo deployment/payment-service
kubectl -n nexora-prod rollout status deployment/payment-service
```
Do not roll back blindly after an irreversible database/schema change.

## Resolution / Verification
Confirm the expected image digest, readiness, business smoke tests, 5xx rate, latency, and dependency health for at least 10 minutes.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-009
- SOP-002
- SOP-003
- INC-001
- INC-012

## Keywords
rollback, rollout undo, known-good, production, Nexora Technologies, production, DevOps, SRE