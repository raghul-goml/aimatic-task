---
document_id: RB-009
document_type: runbook
service: ci-cd
component: ci-cd
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [deployment, rollout, GitHub Actions, image digest, rollback]
related_documents: [RB-001, RB-002, RB-010, SOP-001, INC-001, INC-012]
---

# Deployment Failure Runbook

**Document ID:** RB-009  
**Document Type:** Runbook  
**Service:** ci-cd  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Diagnose failed Kubernetes deployments and determine whether to continue, pause, or roll back.

## Overview
Check GitHub Actions, image digest, manifest diff, ReplicaSet, pod events, readiness, logs, error rate, latency, and dependencies.

## Investigation
```text
kubectl -n nexora-prod rollout status deployment/payment-service
kubectl -n nexora-prod rollout history deployment/payment-service
```
Classify failures as build, image, configuration, probe, dependency, or application regression. A new ReplicaSet does not prove a healthy release.

## Resolution / Verification
Use RB-010 for a correlated production regression. Verify healthy replicas, normal 5xx/latency, and business smoke tests.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-001
- RB-002
- RB-010
- SOP-001
- INC-001
- INC-012

## Keywords
deployment, rollout, GitHub Actions, image digest, rollback, Nexora Technologies, production, DevOps, SRE