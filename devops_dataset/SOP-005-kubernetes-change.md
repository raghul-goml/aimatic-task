---
document_id: SOP-005
document_type: sop
service: kubernetes
component: kubernetes
environment: production
severity: SEV-2
version: 1.0
owner: Platform Engineering
tags: [procedure, kubernetes, change-control, production]
related_documents: [ARCH-006, RB-003, RB-009, RB-012]
---

# Kubernetes Change SOP

**Document ID:** SOP-005  
**Document Type:** SOP  
**Service:** kubernetes  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Control production Kubernetes configuration changes.

## Scope
Control production Kubernetes configuration changes.

## Preconditions
Control production Kubernetes configuration changes.

## Required Checks
Confirm monitoring, recent changes, approvals, rollback strategy, and dependency health.

## Step-by-Step Procedure
Review selectors, ports, probes, resource requests/limits, environment references, and replica counts. Apply through the approved pipeline and validate EndpointSlices.

## Validation
Confirm service health, customer-facing smoke tests, and relevant infrastructure metrics.

## Rollback / Recovery
Do not change selectors or probes without checking traffic behavior and startup characteristics.

## Escalation Conditions
Escalate when customer impact grows, data integrity is at risk, or the documented mitigation fails.

## Common Mistakes
Skipping validation, changing multiple unrelated variables, or treating Running pods as proof of availability.

## Related Documents
- ARCH-006
- RB-003
- RB-009
- RB-012

## Keywords
procedure, kubernetes, change-control, production, Nexora Technologies, production, DevOps, SRE