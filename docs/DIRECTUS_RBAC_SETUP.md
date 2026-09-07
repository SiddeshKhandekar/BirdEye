# BirdEye — Directus RBAC Configuration Guide

> **This file documents the RBAC roles and permissions to configure manually in Directus Admin UI after first boot.**

## Roles to Create

### 1. `citizen`
| Collection | Create | Read | Update | Delete | Field Restrictions |
|---|---|---|---|---|---|
| `issues` | ✅ | Own only (`reported_by = $CURRENT_USER`) | ❌ | ❌ | Cannot set `assigned_department_role`, `status` |
| `citizen_karma` | ❌ | Own only (`user_id = $CURRENT_USER`) | ❌ | ❌ | — |

### 2. `role_road_infra_dept`
| Collection | Create | Read | Update | Delete | Field Restrictions |
|---|---|---|---|---|---|
| `issues` | ❌ | All (filter: `category IN (pothole, streetlights)` + `tenant_id` match) | `status`, `assigned_department_role` only | ❌ | — |
| `issue_clusters` | ❌ | All (tenant scoped) | ❌ | ❌ | — |

### 3. `role_sanitation_dept`
| Collection | Create | Read | Update | Delete | Field Restrictions |
|---|---|---|---|---|---|
| `issues` | ❌ | All (filter: `category IN (garbage, water)` + `tenant_id` match) | `status`, `assigned_department_role` only | ❌ | — |
| `issue_clusters` | ❌ | All (tenant scoped) | ❌ | ❌ | — |

### 4. `ai_service` (Static Token)
| Collection | Create | Read | Update | Delete |
|---|---|---|---|---|
| `issues` | ❌ | ✅ All | ✅ (`status`, `assigned_department_role`, `support_count`) | ❌ |
| `issue_clusters` | ✅ | ✅ All | ✅ (`total_reports`) | ❌ |
| `citizen_karma` | ❌ | ✅ All | ✅ (`points`, `valid_reports_count`, `verifications_count`) | ❌ |

### 5. `super_admin`
Full CRUD on all collections (default Administrator role in Directus).

## Webhook Configuration
After roles are set up:
1. Go to **Settings → Flows** in Directus
2. Create flow: **Trigger** = "Event Hook" on `items.create` for `issues` collection
3. Add operation: **Webhook / Request URL** = `http://ai-service:8000/verify`
4. Pass full item payload in request body
