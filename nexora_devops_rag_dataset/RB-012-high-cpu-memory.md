---
document_id: RB-012
document_type: runbook
service: kubernetes
component: kubernetes
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [CPU, memory, OOMKilled, resource limits, throttling]
related_documents: [RB-001, RB-002, RB-009, MON-002, INC-006]
---

# High CPU and Memory Troubleshooting Runbook

**Document ID:** RB-012  
**Document Type:** Runbook  
**Service:** kubernetes  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Investigate CPU saturation, memory pressure, throttling, and OOMKilled containers.

## Overview
Use `kubectl top pods`, resource requests/limits, restart count, node pressure, and application metrics.

## Investigation
CPU saturation can increase latency and probe failures. Memory pressure can terminate a process with `OOMKilled` and exit code 137. A steadily rising working set suggests a possible leak; a sudden spike may indicate large requests or batch processing.

## Resolution / Verification
Scale or adjust resources based on measured behavior, then verify stable memory/CPU and restart rates. Do not set unlimited memory without capacity analysis.

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
- RB-009
- MON-002
- INC-006

## Keywords
CPU, memory, OOMKilled, resource limits, throttling, Nexora Technologies, production, DevOps, SRE