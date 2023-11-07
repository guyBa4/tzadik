const express = require('express')

const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const userRouter = require("./routes/users")
app.use("/users", userRouter)

const tzadikIdentitiesRouter = require("./routes/tzadik_identities")
app.use("/tzadik_identities", tzadikIdentitiesRouter)

const tzadikReportsRouter = require("./routes/tzadik_reports")
app.use("/tzadik_reports", tzadikReportsRouter)

app.listen(3000)

/**
 * V. Make the debugger function
 * V. Build the folder structure - divide routes to their own files.
 * V. Set up a MySQL server
 * V. Build a proof of concept with an ORM library to access the database.
 * 5. Deploy to the cloud
 * 5.a. Find a cloud provider
 * 5.b. Deploy node server
 * 5.c. Set up the database in the cloud
 * להקים מכונה וירטואלית ולהתחבר אליה בSSH
 */

/**
 * users:
 * - id: auto-generated, sequential number (0,1...)
 * - personal_id: int - mispar ishi
 * - first_name: string
 * - last_name: string
 * - password: string
 * 
 * user_tokens:
 * - id
 * - personal_id
 * - token
 * - creation_timestamp
 * 
 * tzadik_report:
 * - id: ...
 * - tzadik_id: int
 * - reporter_id: int
 * - report_timestamp: int
 * 
 * tzadik_identity:  
 * id: ...
 * tzadik_id: int - primary key
 * assignment: string - shiyoch
 * identiy_creation_timestamp: int
 * 
*/