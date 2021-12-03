import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CandidateProfile } from "./CandidateProfile";

@Entity("candidate_profile_review_status", { schema: "recruitment_management" })
export class CandidateProfileReviewStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(
    () => CandidateProfile,
    (candidateProfile) => candidateProfile.candidateProfileReviewStatus
  )
  candidateProfiles: CandidateProfile[];
}
