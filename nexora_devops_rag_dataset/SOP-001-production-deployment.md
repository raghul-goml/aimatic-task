---
document_id: SOP-001
document_type: sop
service: all-services
component: all-services
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [procedure, all_services, change-control, production]
related_documents: [RB-009, RB-010, SOP-002, MON-003]
---

# Production Deployment SOP

**Document ID:** SOP-001  
**Document Type:** SOP  
**Service:** all-services  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Approved change, tested build, immutable image digest, rollback revision, monitoring dashboard, and owner.

## Scope
Approved change, tested build, immutable image digest, rollback revision, monitoring dashboard, and owner.

## Preconditions
Approved change, tested build, immutable image digest, rollback revision, monitoring dashboard, and owner.

## Required Checks
Confirm monitoring, recent changes, approvals, rollback strategy, and dependency health.

## Step-by-Step Procedure
Validate CI, image digest, manifest diff, rollout status, readiness, smoke tests, 5xx, latency, CPU, memory, and dependencies.

## Validation
Confirm service health, customer-facing smoke tests, and relevant infrastructure metrics.

## Rollback / Recovery
Use RB-010/SOP-002 if customer impact or material regression occurs.

## Escalation Conditions
Escalate when customer impact grows, data integrity is at risk, or the documented mitigation fails.

## Common Mistakes
Skipping validation, changing multiple unrelated variables, or treating Running pods as proof of availability.

## Related Documents
- RB-009
- RB-010
- SOP-002
- MON-003

## Keywords
procedure, all_services, change-control, production, Nexora Technologies, production, DevOps, SRE