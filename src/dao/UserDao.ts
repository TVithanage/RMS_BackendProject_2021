import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class UserDao {
	static async search({ keyword = "", skip = 0 }) {
		const users = await getRepository(User)
			.createQueryBuilder("u")
			.select(["u.id", "u.username", "u.addedDate", "u.mobile", "u.email"])
			.leftJoinAndSelect("u.userStatus", "us")
			.leftJoinAndSelect("u.userRoles", "ur")
			.leftJoinAndSelect("ur.role", "r")
			.where("u.username LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("u.addedDate LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("us.name LIKE :keyword", { keyword: `%${keyword}%` })
			.orWhere("r.name LIKE :keyword", { keyword: `%${keyword}%` })
			.orderBy("u.id")
			.skip(skip)
			.take(15)
			.getMany();

		return users;
	}
}
