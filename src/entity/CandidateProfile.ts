import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CandidateProfileReviewStatus } from "./CandidateProfileReviewStatus";
import { User } from "./User";
import { CandidateQualification } from "./CandidateQualification";

@Index(
  "fk_candidate_profile_candidate_profile_review_status1_idx",
  ["candidateProfileReviewStatusId"],
  {}
)
@Index("fk_candidate_profile_user1_idx", ["userId"], {})
@Index("fk_candidate_profile_user2_idx", ["reviewUserId"], {})
@Entity("candidate_profile", { schema: "recruitment_management" })
export class CandidateProfile {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "photo_filename", length: 100 })
  photoFilename: string;

  @Column("varchar", { name: "short_name", length: 100 })
  shortName: string;

  @Column("varchar", { name: "full_name", length: 255 })
  fullName: string;

  @Column("char", { name: "mobile", length: 10 })
  mobile: string;

  @Column("char", { name: "land", length: 10 })
  land: string;

  @Column("varchar", { name: "address", length: 300 })
  address: string;

  @Column("varchar", { name: "nic", length: 12 })
  nic: string;

  @Column("varchar", { name: "nic_filename", length: 100 })
  nicFilename: string;

  @Column("date", { name: "modified_date" })
  modifiedDate: string;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "review_user_id", nullable: true })
  reviewUserId: number | null;

  @Column("int", { name: "review_score", nullable: true, default: () => "'0'" })
  reviewScore: number | null;

  @Column("date", { name: "review_date", nullable: true })
  reviewDate: string | null;

  @Column("varchar", { name: "review_remarks", nullable: true, length: 250 })
  reviewRemarks: string | null;

  @Column("int", {
    name: "candidate_profile_review_status_id",
    default: () => "'1'",
  })
  candidateProfileReviewStatusId: number;

  @ManyToOne(
    () => CandidateProfileReviewStatus,
    (candidateProfileReviewStatus) =>
      candidateProfileReviewStatus.candidateProfiles,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "candidate_profile_review_status_id", referencedColumnName: "id" },
  ])
  candidateProfileReviewStatus: CandidateProfileReviewStatus;

  @ManyToOne(() => User, (user) => user.candidateProfiles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => User, (user) => user.candidateProfiles2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "review_user_id", referencedColumnName: "id" }])
  reviewUser: User;

  @OneToMany(
    () => CandidateQualification,
    (candidateQualification) => candidateQualification.candidateProfile
  )
  candidateQualifications: CandidateQualification[];
}
