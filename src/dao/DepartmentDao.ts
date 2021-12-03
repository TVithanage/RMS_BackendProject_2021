import { getRepository } from "typeorm";
import { Department } from "../entity/Department";

export class DepartmentDao {
	static search({ keyword = "", skip = 0 }) {
		return getRepository(Department)
			.createQueryBuilder("r")
			.where("r.name LIKE :keyword", { keyword: `%${keyword}%` })
			.getMany();
	}
}
