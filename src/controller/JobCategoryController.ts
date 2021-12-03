import { getRepository } from "typeorm";
import { JobCategoryDao } from "../dao/JobCategoryDao";
import { JobCategory } from "../entity/JobCategory";

export class JobCategoryController {
	static async get(data) {
		if (data !== undefined && data.id) {
			return this.getOne(data);
		} else {
			return this.search(data);
		}
	}

	private static async getOne({ id }) {
		// search for an entry with given id
		const role = await getRepository(JobCategory)
			.findOne({
				where: { id: id },
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
		if (role !== undefined) {
			return {
				status: true,
				data: role,
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
		const entires = await JobCategoryDao.search(data).catch((e) => {
			console.log(e.code, e);
			throw {
				status: false,
				type: "server",
				msg: "Server Error!. Please check logs.",
			};
		});

		return {
			status: true,
			data: entires,
		};
	}

	static async save(data) {
		const role = data as JobCategory;

		await getRepository(JobCategory)
			.save(role)
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
			msg: "That entry has been added!",
		};
	}

	static async update(data) {
		const editedEntry = data as JobCategory;

		const selectedRole = await getRepository(JobCategory)
			.findOne(editedEntry.id)
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		if (!selectedRole) {
			throw {
				status: false,
				type: "input",
				msg: "That role doesn't exist in our database!.",
			};
		}

		await getRepository(JobCategory)
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
		const role = await getRepository(JobCategory)
			.findOne({ id: id })
			.catch((e) => {
				console.log(e.code, e);
				throw {
					status: false,
					type: "server",
					msg: "Server Error!. Please check logs.",
				};
			});

		if (!role) {
			throw {
				status: false,
				type: "input",
				msg: "That entry doesn't exist in our database!.",
			};
		}

		await getRepository(JobCategory)
			.delete(role)
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
