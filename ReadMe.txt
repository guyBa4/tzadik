API:

**** Users ****
3000/Users/AddUser (no token needed) 
    {
    personal_id: ,
    first_name: ,
    last_name: ,
    password: 
    }
3000/Users/Login/:personal_id/:password (no token needed)
3000/Users/Delete
3000/Users/UpdateFirstName/:personal_id/:first_name


**** Tzadik Identities ****
3000/TzadikIdentities/AddTzadik     
    {
    tzadik_id: ,
    assignment: 
    }
3000/TzadikIdentities/GetById/:id
3000/TzadikIdentities/UpdateAssignment/:id/:assign
3000/TzadikIdentities/Delete


**** Tzadik Report ****
3000/TzadikReports/AddReport 
    {
    tzadik_id: ,
    reporter_id:
    }
3000/TzadikReports/GetById/:id
3000/TzadikReports/Delete
3000/TzadikReports/GenerateReport/:unit_id


