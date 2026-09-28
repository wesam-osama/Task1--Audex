# Audex — Week 1 Documentation

## Task
**Role-aware shell**

Build a React page shell that displays the active Audex product/workspace/school and blocks a page for an unauthorized role.

## Objective
Demonstrate a small React application shell with active context, user role, centralized permissions, protected routes, and clear unauthorized-access handling.

## Scope
### Included
- React + Vite frontend
- React Router
- Mock user/context data
- Centralized local permissions
- Route-level authorization
- Manual route testing
- Evidence screenshots

### Out of scope
- Backend
- Database
- Real authentication
- Real Audex API
- Production deployment
- Full Audex application

## Assumptions
1. No Audex backend/API was provided.
2. Product, workspace, school, and user data are mock data.
3. Roles and permissions are locally defined for demonstration.
4. Authentication is outside the scope.
5. Authorization is demonstrated at route level.

## Permission Model
| Role | Dashboard | Users | Reports |
|---|---|---|---|
| Admin | Allowed | Allowed | Allowed |
| Teacher | Allowed | Blocked | Allowed |
| Student | Allowed | Blocked | Blocked |

## Implementation
Permissions are centralized in `src/auth/permissions.js`.
`ProtectedRoute.jsx` checks the role against the requested page. If access is denied, the user is redirected to `/unauthorized`.

The shell displays:
- Product: Audex
- Workspace: Demo Workspace
- School: Demo School
- Current role

## Testing
Test these scenarios:
1. Admin → Dashboard → Allowed
2. Admin → Users → Allowed
3. Admin → Reports → Allowed
4. Teacher → Dashboard → Allowed
5. Teacher → Reports → Allowed
6. Teacher → Users → Blocked
7. Student → Dashboard → Allowed
8. Student → Users → Blocked
9. Student → Reports → Blocked

Also run `npm run build` and confirm the build completes without errors.

## Evidence
Capture:
- `01-active-context.png`
- `02-authorized-route.png`
- `03-unauthorized-route.png`

## Definition of Done
The active context is visible, authorized routes work, unauthorized routes are blocked, testing is documented, screenshots are captured, the project builds successfully, and the implementation can be demonstrated in a short review.
