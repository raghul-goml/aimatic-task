---
document_id: RB-001
document_type: runbook
service: kubernetes
component: kubernetes
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [kubernetes, pod, readinessProbe, livenessProbe, restart]
related_documents: [RB-002, RB-003, RB-009, RB-010, ARCH-006]
---

# Kubernetes Pod Troubleshooting Runbook

**Document ID:** RB-001  
**Document Type:** Runbook  
**Service:** kubernetes  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Diagnose unhealthy Kubernetes pods using status, events, logs, probes, resources, and dependencies.

## Overview
Use when pods are Pending, ContainerCreating, Running but not Ready, or repeatedly restarting.

## Investigation
1. Inspect `kubectl get pods` and `kubectl describe pod`.
2. Review Events for scheduling, image, mount, and probe failures.
3. Retrieve current and `--previous` logs.
4. Check `readinessProbe`, `livenessProbe`, CPU/memory requests and limits.
5. Check PostgreSQL, Redis, Kafka, DNS, and downstream dependencies.
A Running pod is not necessarily a serving pod; readiness controls whether it becomes a Service endpoint.

## Resolution / Verification
Confirm stable replicas, readiness=true, expected EndpointSlices, normal restart count, and successful smoke tests.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-002
- RB-003
- RB-009
- RB-010
- ARCH-006

## Keywords
kubernetes, pod, readinessProbe, livenessProbe, restart, Nexora Technologies, production, DevOps, SRE