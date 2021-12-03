import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CandidateProfile } from "./CandidateProfile";
import { QualificationType } from "./QualificationType";

@Index(
  "fk_candidate_qualification_candidate_profile1_idx",
  ["candidateProfileId"],
  {}
)
@Index("fk_qualification_qualification_type1_idx", ["qualificationTypeId"], {})
@Entity("candidate_qualification", { schema: "recruitment_management" })
export class CandidateQualification {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "filename", length: 100 })
  filename: string;

  @Column("int", { name: "candidate_profile_id" })
  candidateProfileId: number;

  @Column("int", { name: "qualification_type_id" })
  qualificationTypeId: number;

  @Column("int", { name: "score", nullable: true, default: () => "'0'" })
  score: number | null;

  @ManyToOne(
    () => CandidateProfile,
    (candidateProfile) => candidateProfile.candidateQualifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "candidate_profile_id", referencedColumnName: "id" }])
  candidateProfile: CandidateProfile;

  @ManyToOne(
    () => QualificationType,
    (qualificationType) => qualificationType.candidateQualifications,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "qualification_type_id", referencedColumnName: "id" }])
  qualificationType: QualificationType;
}
