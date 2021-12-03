/* 
=====================================================================================
DOTENV: Load settings from .env to process.env (see sample.env)
=====================================================================================
*/

require("dotenv").config();

/* 
=====================================================================================
Libraries
=====================================================================================
*/

// Libraries: 3rd Party
import { createConnection } from "typeorm";
import * as express from "express";
import * as session from "express-session";
import * as fileUpload from "express-fileupload";
/* 
=====================================================================================
Controllers
=====================================================================================
*/

import {
	AuthController,
	ProfileController,
	UserController,
	GeneralController,
	RoleController,
	PrivilegeController,
	FileUploadController,
	CandidateProfileController,
	JobCategoryController,
	DepartmentController,
	JobVacancyController,
	CandidateProfileReviewController,
} from "./controller";

/* 
=====================================================================================
Utilities
=====================================================================================
*/

import { RegexPatternUtil } from "./util/RegexPatternUtil";

/* 
=====================================================================================
TypeORM
=====================================================================================
*/

// TypeORM: Create connection to the detabase
createConnection()
	.then(() => {
		console.log("SUCESS: Database connected.");
	})
	.catch((error) => {
		console.log("ERROR: Database  connection failed.");
		throw Error(error);
	});

/* 
=====================================================================================
Express.js
=====================================================================================
*/

// method used for checking permissions
const isAuthorized = AuthController.isAuthorized;

// Express.js: Initialize
const app = express();

// Express.js: Parse json request bodies
app.use(
	express.json({
		limit: "8000kb",
	})
);

// Express.js: Handle file uploads
app.use(fileUpload());

// Express.js: Sessions for login
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
	})
);

// Changes for the development enviroment
if (process.env.PRODUCTION == "false") {
	// enable CORS
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});

	// dummy session data
	app.use((req, res, next) => {
		req.session.data = {
			username: "admin",
			logged: true,
			userRoles: [{ roleId: 1 }, { roleId: 2 }],
			userId: 1,
		};
		next();
	});
}

// Express.js: Folder with static HTML files to server the user
app.use("/", express.static(`${__dirname}/../../frontend`));
app.use("/uploads", express.static(`${__dirname}/../uploads`));

/* 
====================================================================================
Routes
=====================================================================================
*/

// Routes: Authentication Routes
app.route("/api/login").post((req, res) => {
	AuthController.logIn(req.session, req.body.data)
		.then((r) => res.json(r))
		.catch((e) => sendErrors(res, e));
});

app.route("/api/logout").get((req, res) => {
	AuthController.logOut(req.session)
		.then((r) => res.json(r))
		.catch((e) => sendErrors(res, e));
});

// Routes: Profile
app
	.route("/api/profile")
	.all((req, res, next) => {
		isAuthorized(req)
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		ProfileController.getOne(req.session)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

app.route("/api/profile/password").put((req, res) => {
	ProfileController.updatePassword(req.body.data, req.session)
		.then((r) => res.json(r))
		.catch((e) => sendErrors(res, e));
});

// Routes: User Routes
app
	.route("/api/users")
	.all((req, res, next) => {
		isAuthorized(req, false, "USER")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		UserController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.post((req, res) => {
		UserController.save(req.body.data, req.session)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		UserController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.delete((req, res) => {
		UserController.delete(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Roles
app
	.route("/api/roles")
	.all((req, res, next) => {
		isAuthorized(req, false, "ROLE")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		RoleController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.post((req, res) => {
		RoleController.save(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		RoleController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.delete((req, res) => {
		RoleController.delete(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Privileges
app
	.route("/api/privileges")
	.all((req, res, next) => {
		isAuthorized(req, false, "PRIVILEGE")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		PrivilegeController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		PrivilegeController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Candidate profiles
app
	.route("/api/candidate_profiles")
	.all((req, res, next) => {
		isAuthorized(req, false, "CANDIDATE_PROFILE")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		CandidateProfileController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		CandidateProfileController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Job categories
app
	.route("/api/job_categories")
	.all((req, res, next) => {
		isAuthorized(req, false, "JOB_CATEGORY")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		JobCategoryController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.post((req, res) => {
		JobCategoryController.save(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		JobCategoryController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.delete((req, res) => {
		JobCategoryController.delete(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Departments
app
	.route("/api/departments")
	.all((req, res, next) => {
		isAuthorized(req, false, "DEPARTMENT")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		DepartmentController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.post((req, res) => {
		DepartmentController.save(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		DepartmentController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.delete((req, res) => {
		DepartmentController.delete(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

app
	.route("/api/job_vacancies")
	.all((req, res, next) => {
		isAuthorized(req, false, "JOB_VACANCY")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		JobVacancyController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.post((req, res) => {
		JobVacancyController.save(req.body.data, req.session)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		JobVacancyController.update(req.body.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.delete((req, res) => {
		JobVacancyController.delete(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Candidate Profile Reviews
app
	.route("/api/candidate_profile_reviews")
	.all((req, res, next) => {
		isAuthorized(req, false, "CANDIDATE_PROFILE_REVIEW")
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		CandidateProfileReviewController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	})

	.put((req, res) => {
		CandidateProfileReviewController.update(req.body.data, req.session)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// Routes: Misc Routes
app
	.route("/api/regexes")
	.all((req, res, next) => {
		isAuthorized(req)
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		RegexPatternUtil.getModuleRegex(req.query.data.module)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

app
	.route("/api/general")
	.all((req, res, next) => {
		isAuthorized(req)
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.get((req, res) => {
		GeneralController.get(req.query.data)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

app
	.route("/api/upload")
	.all((req, res, next) => {
		isAuthorized(req)
			.then(() => {
				next();
			})
			.catch((e) => sendErrors(res, e));
	})

	.post((req, res) => {
		FileUploadController.uploadFile(req)
			.then((r) => res.json(r))
			.catch((e) => sendErrors(res, e));
	});

// send errors to the client
const sendErrors = (res, e) => {
	console.log("Error:", e);
	res.json(e);
};

// Express.js: Start the server
app.listen(process.env.PORT, () =>
	console.log(`Server is running on ${process.env.PORT}!`)
);
