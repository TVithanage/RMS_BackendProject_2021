import { getRepository } from "typeorm";
import { CandidateProfile } from "../entity/CandidateProfile";

export class CandidateProfileReviewDao {
	static search({ keyword = "", skip = 0 }) {
		return getRepository(CandidateProfile)
			.createQueryBuilder("cp")
			.leftJoinAndSelect("cp.candidateProfileReviewStatus", "cprs")
			.where("cp.shortName LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("cp.fullName LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("cp.mobile LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("cp.land LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("cp.nic LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("cprs.name LIKE :keyword", { keyword: `%${keyword}%` })
			.orderBy("cp.modifiedDate", "DESC")
			.getMany();
	}
}
