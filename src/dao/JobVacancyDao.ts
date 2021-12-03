import { getRepository } from "typeorm";
import { JobVacancy } from "../entity/JobVacancy";

export class JobVacancyDao {
	static search({ keyword = "", skip = 0 }) {
		return getRepository(JobVacancy)
			.createQueryBuilder("j")
			.where("j.title LIKE :keyword", { keyword: `%${keyword}%` })
			.leftJoinAndSelect("j.jobVacancyStatus", "jvs")
			.leftJoinAndSelect("j.jobCategory", "jc")
			.leftJoinAndSelect("j.department", "jd")
			.skip(skip)
			.take(15)
			.getMany();
	}
}
