import { getRepository } from "typeorm";
import { CandidateProfile } from "../entity/CandidateProfile";
import { CandidateQualification } from "../entity/CandidateQualification";
import { QualificationType } from "../entity/QualificationType";
import * as moment from "moment";

export class CandidateProfileController {
	static async get(data) {
		if (data !== undefined && data.userId) {
			return this.getOne(data);
		} else {
			return this.search(data);
		}
	}

	private static async getOne({ userId }) {
		const user = await getRepository(CandidateProfile)
			.findOne({
				relations: [
					"candidateQualifications",
					"candidateQualifications.qualificationType",
				],
				where: { userId: userId },
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
		if (user !== undefined) {
			return {
				status: true,
				data: user,
			};
		} else {
			return {
				status: true, // exception for candidate profile loading
				type: "input",
				msg: "Unable to find an entry with that id.",
			};
		}
	}

	private static async search(data = {}) {
		// const users = await UserDao.search(data).catch((e) => {
		// 	console.log(e.code, e);
		// 	throw {
		// 		status: false,
		// 		type: "server",
		// 		msg: "Server Error!. Please check logs.",
		// 	};
		// });
		// return {
		// 	status: true,
		// 	data: users,
		// };
	}

	static async update(data) {
		const candidateProfile = data as CandidateProfile;

		try {
			candidateProfile.modifiedDate = moment().format("YYYY-MM-DD");

			const dbCandidateProfile = await getRepository(CandidateProfile).save(
				candidateProfile
			);

			// find qualification types
			const educationalType = await getRepository(QualificationType).findOne({
				name: "Educational",
			});

			const professionalType = await getRepository(QualificationType).findOne({
				name: "Professional",
			});

			const experienceType = await getRepository(QualificationType).findOne({
				name: "Experience",
			});

			if (!educationalType || !professionalType || !experienceType) {
				throw "Unable to find a qualification type";
			}

			// save qualifications
			const qualifications: Array<any> = [];

			data.qualifications.forEach((q) => {
				let qType: QualificationType;

				if (q.qualificationTypeName == "Educational") {
					qType = educationalType;
				} else if (q.qualificationTypeName == "Professional") {
					qType = professionalType;
				} else {
					qType = experienceType;
				}

				const qualification: any = {
					name: q.name,
					filename: q.filename,
					candidateProfileId: q.candidateProfileId || dbCandidateProfile.id,
					qualificationTypeId: q.qualificationTypeId || qType.id,
				};

				if (q.id) {
					qualification.id = q.id;
				}

				qualifications.push(qualification);
			});

			const dbQualifications = await getRepository(CandidateQualification).save(
				qualifications
			);

			// cleanup
			if (qualifications[0].id) {
				const currentQualIds = qualifications.map((q) => q.id);

				const dbQualifications = await getRepository(
					CandidateQualification
				).find({ candidateProfileId: dbCandidateProfile.id });

				for (const dbQual of dbQualifications) {
					if (!currentQualIds.includes(dbQual.id)) {
						await getRepository(CandidateQualification).delete(dbQual);
						// TODO: delete file as well
					}
				}
			}

			return {
				status: true,
				msg: "Candidate profile has been updated!",
			};
		} catch (e) {
			console.log(e.code, e);
			throw {
				status: false,
				type: "server",
				msg: "Server Error!. Please check logs.",
			};
		}
	}
}
