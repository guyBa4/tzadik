const express = require('express')

const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const userRouter = require("./routes/UserRoutes")
app.use("/Users", userRouter)

const tzadikIdentitiesRouter = require("./routes/TzadikIdentityRoutes")
app.use("/TzadikIdentities", tzadikIdentitiesRouter)

const tzadikReportsRouter = require("./routes/TzadikReportRoutes")
app.use("/TzadikReports", tzadikReportsRouter)

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
  });


  /**
   how to generate a good key and where to store it safetly?
   */
  
  /**
   * V. init database connection from a single file
   * V. database credentials should be taken from a enviornmental variables settings
   * V. Naming: Urls - CaptialCase, Filenames: CapitalCase, Variable names: camelCase  
   * V. add tokens
   */
/**
 * V. Make the debugger function
 * V. Build the folder structure - divide routes to their own files.
 * V. Set up a MySQL server
 * V. Build a proof of concept with an ORM library to access the database.
 * V. Deploy to the cloud
 * V.a. Find a cloud provider
 * V.b. Deploy node server
 * V.c. Set up the database in the cloud
 * V להקים מכונה וירטואלית ולהתחבר אליה בSSH
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