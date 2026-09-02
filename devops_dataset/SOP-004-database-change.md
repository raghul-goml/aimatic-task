---
document_id: SOP-004
document_type: sop
service: postgresql
component: postgresql
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [procedure, postgresql, change-control, production]
related_documents: [ARCH-005, INC-005, INC-010]
---

# Database Change SOP

**Document ID:** SOP-004  
**Document Type:** SOP  
**Service:** postgresql  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Control production schema changes and migrations.

## Scope
Control production schema changes and migrations.

## Preconditions
Control production schema changes and migrations.

## Required Checks
Confirm monitoring, recent changes, approvals, rollback strategy, and dependency health.

## Step-by-Step Procedure
Rehearse against production-like data, confirm idempotency, inspect locks/connections, apply through approved tooling, validate schema and application behavior.

## Validation
Confirm service health, customer-facing smoke tests, and relevant infrastructure metrics.

## Rollback / Recovery
Prefer forward fixes for irreversible schema changes; do not blindly roll back application code after schema changes.

## Escalation Conditions
Escalate when customer impact grows, data integrity is at risk, or the documented mitigation fails.

## Common Mistakes
Skipping validation, changing multiple unrelated variables, or treating Running pods as proof of availability.

## Related Documents
- ARCH-005
- INC-005
- INC-010

## Keywords
procedure, postgresql, change-control, production, Nexora Technologies, production, DevOps, SRE