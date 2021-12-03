import { getRepository } from "typeorm";
import { JobCategory } from "../entity/JobCategory";

export class JobCategoryDao {
	static search({ keyword = "", skip = 0 }) {
		return getRepository(JobCategory)
			.createQueryBuilder("r")
			.where("r.name LIKE :keyword", { keyword: `%${keyword}%` })
			.getMany();
	}
}
