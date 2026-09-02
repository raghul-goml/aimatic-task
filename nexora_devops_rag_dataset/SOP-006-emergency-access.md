---
document_id: SOP-006
document_type: sop
service: platform
component: platform
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [procedure, platform, change-control, production]
related_documents: [SOP-003, SOP-005, RB-001]
---

# Emergency Production Access SOP

**Document ID:** SOP-006  
**Document Type:** SOP  
**Service:** platform  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Provide time-bound emergency access while preserving auditability.

## Scope
Provide time-bound emergency access while preserving auditability.

## Preconditions
Provide time-bound emergency access while preserving auditability.

## Required Checks
Confirm monitoring, recent changes, approvals, rollback strategy, and dependency health.

## Step-by-Step Procedure
Obtain incident approval, use the approved privileged mechanism, record commands/timestamps, perform only incident-related actions, and revoke access after recovery.

## Validation
Confirm service health, customer-facing smoke tests, and relevant infrastructure metrics.

## Rollback / Recovery
Never copy secrets into chat, commit emergency credentials, or disable audit logging.

## Escalation Conditions
Escalate when customer impact grows, data integrity is at risk, or the documented mitigation fails.

## Common Mistakes
Skipping validation, changing multiple unrelated variables, or treating Running pods as proof of availability.

## Related Documents
- SOP-003
- SOP-005
- RB-001

## Keywords
procedure, platform, change-control, production, Nexora Technologies, production, DevOps, SRE