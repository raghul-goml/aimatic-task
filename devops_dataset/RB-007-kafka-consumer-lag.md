---
document_id: RB-007
document_type: runbook
service: kafka
component: kafka
environment: production
severity: SEV-3
version: 1.0
owner: Platform Engineering
tags: [Kafka, consumer lag, partition, consumer group, events]
related_documents: [RB-002, ARCH-004, MON-001, INC-002, INC-008]
---

# Kafka Consumer Lag Troubleshooting Runbook

**Document ID:** RB-007  
**Document Type:** Runbook  
**Service:** kafka  
**Version:** 1.0  
**Last Updated:** 2026-08-28  
**Owner:** Platform Engineering

## Purpose
Troubleshoot Kafka consumer lag, stalled consumers, partition imbalance, and slow processing.

## Overview
Consumer lag indicates messages are arriving faster than the consumer group is successfully processing them.

## Investigation
Inspect topic, consumer group, partition assignment, processing latency, consumer errors, restarts, and broker health.
```text
consumer_group=payment-events
topic=payment-events
lag=18432
partitions_assigned=3
```
Distinguish increased producer volume from consumer failure. Scaling consumers only helps when partition count and downstream capacity allow it.

## Resolution / Verification
Fix crashes/schema errors first, then scale appropriately. Verify lag trends downward and producer/consumer throughput converge.

## Example Errors
```text
ERROR service-operation
status=failed
environment=nexora-prod
action=inspect-metrics-and-logs
```


## Related Documents
- RB-002
- ARCH-004
- MON-001
- INC-002
- INC-008

## Keywords
Kafka, consumer lag, partition, consumer group, events, Nexora Technologies, production, DevOps, SRE