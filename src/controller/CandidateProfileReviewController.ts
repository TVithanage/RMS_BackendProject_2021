import { getRepository } from "typeorm";
import { CandidateProfileReviewDao } from "../dao/CandidateProfileReviewsDao";
import { CandidateProfile } from "../entity/CandidateProfile";
import { CandidateQualification } from "../entity/CandidateQualification";
import { QualificationType } from "../entity/QualificationType";

export class CandidateProfileReviewController {
	static async get(data) {
		if (data !== undefined && data.id) {
			return this.getOne(data);
		} else {
			return this.search(data);
		}
	}

	private static async getOne({ id }) {
		const user = await getRepository(CandidateProfile)
			.findOne({
				relations: [
					"candidateQualifications",
					"candidateQualifications.qualificationType",
				],
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
		const entries = await CandidateProfileReviewDao.search(data).catch((e) => {
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

	static async update(data, session) {
		try {
			const candidateProfileRepo = await getRepository(CandidateProfile);
			const candidateQualificationRepo = await getRepository(
				CandidateQualification
			);

			const candidateProfile = await candidateProfileRepo.findOne(
				data.candidateProfileId
			);
			candidateProfile.candidateProfileReviewStatusId =
				data.candidateProfileReviewStatusId;

			let totalScore = 0;

			for (const qs of data.qualificationScores) {
				const qualification = await candidateQualificationRepo.findOne(qs.id);
				qualification.score = parseInt(qs.score);
				await candidateQualificationRepo.save(qualification);
				totalScore += parseInt(qs.score);
			}

			candidateProfile.reviewScore = totalScore;
			await candidateProfileRepo.save(candidateProfile);

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
