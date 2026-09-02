---
document_id: RB-008
document_type: runbook
service: docker
component: docker
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [Docker, image, ENTRYPOINT, container, ImagePullBackOff]
related_documents: [RB-009, SOP-001, INC-012]
---

# Docker Container Troubleshooting Runbook

**Document ID:** RB-008  
**Document Type:** Runbook  
**Service:** docker  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Diagnose container build, startup, entrypoint, environment, and port failures.

## Overview
Check image identity, entrypoint, environment variables, application logs, filesystem permissions, exposed ports, and architecture.

## Investigation
Useful commands:
```text
docker ps -a
docker logs <container>
docker inspect <container>
```
A Kubernetes `ImagePullBackOff` requires checking the image tag and registry access. A local container that starts but cannot receive traffic may be listening on localhost instead of `0.0.0.0`.

## Resolution / Verification
Run the image with production-like non-secret configuration and confirm the health endpoint. Promote only immutable, verified images.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-009
- SOP-001
- INC-012

## Keywords
Docker, image, ENTRYPOINT, container, ImagePullBackOff, Nexora Technologies, production, DevOps, SRE