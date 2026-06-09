# Stage 1

## Notification System Design

### What we are solving

Students get too many campus updates at once. The priority inbox should show the **top 10** unread notifications first, using type weight and recency.

### Priority rules

1. Type weight: `Placement` > `Result` > `Event`
2. Recency: newer notifications rank higher inside the same type

### Scoring

Each notification gets one score:

```
score = (typeWeight * 10^15) + timestampInMillis
```

| Type      | Weight |
|-----------|--------|
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

This keeps type as the main factor while still respecting time order.

### Data source

Notifications are fetched live from:

`GET http://4.224.186.213/evaluation-service/notifications`

No database is used and no notification data is hard-coded.

### Efficient top 10 maintenance

`PriorityInbox` uses a min-heap of size 10:

- The heap root is the weakest item in the current top 10.
- Each new notification costs `O(log 10)` time.
- Memory stays fixed at 10 items.

Flow for streaming updates:

1. If heap has fewer than 10 items, insert normally.
2. If heap is full and the new item scores higher than the root, replace the root.
3. Otherwise ignore the new item.

This is a good fit when notifications keep arriving over time.

### Backend layout

- `domain` holds the ranking logic
- `repository` talks to the evaluation API
- `service` applies business rules
- `controller` and `route` expose HTTP endpoints
- `cache` stores the bearer token briefly
- `cron_job` clears the token cache on a schedule

### Logging

All meaningful events go through `Log(stack, level, package, message)`. Standard console logging is not used for application events.
