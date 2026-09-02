---
document_id: RB-002
document_type: runbook
service: kubernetes
component: kubernetes
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [CrashLoopBackOff, OOMKilled, startup, container]
related_documents: [RB-001, RB-005, RB-006, RB-012, SOP-001]
---

# Kubernetes CrashLoopBackOff Runbook

**Document ID:** RB-002  
**Document Type:** Runbook  
**Service:** kubernetes  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Troubleshoot containers that repeatedly start and exit.

## Overview
`CrashLoopBackOff` indicates repeated container failures. Check exit code, previous logs, configuration, dependencies, probes, and OOMKilled events.

## Investigation
Use `kubectl describe pod` and `kubectl logs --previous`. Exit code 137 or `OOMKilled` indicates memory pressure. Exit code 1 commonly indicates application/configuration failure. Check ConfigMaps, Secret references, Redis, PostgreSQL, Kafka, and DNS. Compare the current ReplicaSet with the last known-good revision.

## Resolution / Verification
Fix the underlying cause before restarting. If correlated with a release and a known-good revision exists, use RB-010. Verify two or more healthy probe cycles.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-001
- RB-005
- RB-006
- RB-012
- SOP-001

## Keywords
CrashLoopBackOff, OOMKilled, startup, container, Nexora Technologies, production, DevOps, SRE