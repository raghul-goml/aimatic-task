---
document_id: RB-005
document_type: runbook
service: postgresql
component: postgresql
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [PostgreSQL, connection pool exhaustion, connection refused, timeout]
related_documents: [RB-009, ARCH-005, SOP-004, INC-005]
---

# PostgreSQL Connectivity Troubleshooting Runbook

**Document ID:** RB-005  
**Document Type:** Runbook  
**Service:** postgresql  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Diagnose PostgreSQL connection failures, timeouts, and connection pool exhaustion.

## Overview
Symptoms include `connection refused`, timeout, `too many clients`, pool exhaustion, and elevated query latency.

## Investigation
Check database availability, DNS/TCP connectivity, active connections, pool utilization, long-running sessions, locks, and recent deployments. Compare application pool maximums with the database connection budget.
```text
ERROR database connection
host=postgres-primary port=5432
error=connection pool exhausted
```
Use `pg_stat_activity` under approved access controls.

## Resolution / Verification
Restore connectivity, reduce excessive concurrency, address leaks or slow queries, and verify connection count and latency return to baseline. Do not blindly raise database limits.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-009
- ARCH-005
- SOP-004
- INC-005

## Keywords
PostgreSQL, connection pool exhaustion, connection refused, timeout, Nexora Technologies, production, DevOps, SRE