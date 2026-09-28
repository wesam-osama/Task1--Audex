Week 1 Test Results

Test 1 — Admin / Dashboard

Role: Admin
Route: "/dashboard"
Expected: Access allowed
Result: Passed

Test 2 — Admin / Users

Role: Admin
Route: "/users"
Expected: Access allowed
Result: Passed

Test 3 — Teacher / Dashboard

Role: Teacher
Route: "/dashboard"
Expected: Access allowed
Result: Passed

Test 4 — Teacher / Users

Role: Teacher
Route: "/users"
Expected: Access blocked
Result: Passed

Test 5 — Student / Reports

Role: Student
Route: "/reports"
Expected: Access blocked
Result: Passed

Conclusion

The role-aware route protection works as expected for the tested roles and pages.