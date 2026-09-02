---
document_id: SOP-002
document_type: sop
service: all-services
component: all-services
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [procedure, all_services, change-control, production]
related_documents: [RB-010, SOP-001, SOP-003]
---

# Production Rollback SOP

**Document ID:** SOP-002  
**Document Type:** SOP  
**Service:** all-services  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Incident approval, known-good revision, captured evidence, and communication.

## Scope
Incident approval, known-good revision, captured evidence, and communication.

## Preconditions
Incident approval, known-good revision, captured evidence, and communication.

## Required Checks
Confirm monitoring, recent changes, approvals, rollback strategy, and dependency health.

## Step-by-Step Procedure
Freeze unrelated changes, identify last good digest, execute rollback, watch rollout, validate business flows, and monitor recovery.

## Validation
Confirm service health, customer-facing smoke tests, and relevant infrastructure metrics.

## Rollback / Recovery
Escalate if rollback fails or schema changes make rollback unsafe.

## Escalation Conditions
Escalate when customer impact grows, data integrity is at risk, or the documented mitigation fails.

## Common Mistakes
Skipping validation, changing multiple unrelated variables, or treating Running pods as proof of availability.

## Related Documents
- RB-010
- SOP-001
- SOP-003

## Keywords
procedure, all_services, change-control, production, Nexora Technologies, production, DevOps, SRE