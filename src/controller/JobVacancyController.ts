import { getRepository } from "typeorm";
import { JobVacancy } from "../entity/JobVacancy";
import { JobVacancyDao } from "../dao/JobVacancyDao";
import { ValidationUtil } from "../util/ValidationUtil";

export class JobVacancyController {
	static async get(data) {
		if (data !== undefined && data.id) {
			return this.getOne(data);
		} else {
			return this.search(data);
		}
	}

	private static async getOne({ id }) {
		const entry: any = await getRepository(JobVacancy)
			.findOne({
				where: { id: id },
				relations: ["user"],
			})
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		// check if entry exists
		if (entry) {
			entry.createdUser = entry.user.username;
			delete entry.user;
			return {
				status: true,
				data: entry,
			};
		} else {
			throw {
				status: false,
				type: "input",
				msg: "Unable to find an entry with that id.",
			};
		}
	}

	private static async search(data = {}) {
		const entries = await JobVacancyDao.search(data).catch((e) => {
			console.log(e.code, e);
			throw {
				status: false,
				type: "server",
				msg: "Server Error!. Please check logs.",
			};
		});

		return {
			status: true,
			data: entries,
		};
	}

	static async save(data, session) {
		const newEntry = data as JobVacancy;

		newEntry.userId = session.data.userId;

		const addedEntry = await getRepository(JobVacancy)
			.save(newEntry)
			.catch((e) => {
				console.log(e.code, e);

				if (e.code == "ER_DUP_ENTRY") {
					throw {
						status: false,
						type: "input",
						msg: "Entry already exists!.",
					};
				}
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		return {
			status: true,
			data: addedEntry.id,
			msg: "That entry has been added!",
		};
	}

	static async update(data) {
		const editedEntry = data as JobVacancy;

		const selectedEntry = await getRepository(JobVacancy)
			.findOne(editedEntry.id)
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		if (!selectedEntry) {
			throw {
				status: false,
				type: "input",
				msg: "That entry doesn't exist in our database!.",
			};
		}

		await getRepository(JobVacancy)
			.save(editedEntry)
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		return {
			status: true,
			msg: "That entry has been updated!",
		};
	}

	static async delete({ id }) {
		const entry = await getRepository(JobVacancy)
			.findOne({ id: id })
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		if (!entry) {
			throw {
				status: false,
				type: "input",
				msg: "That entry doesn't exist in our database!.",
			};
		}

		await getRepository(JobVacancy)
			.delete(entry)
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		return {
			status: true,
			msg: "That entry has been deleted!",
		};
	}
}
