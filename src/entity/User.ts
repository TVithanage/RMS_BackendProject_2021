import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CandidateProfile } from "./CandidateProfile";
import { JobVacancy } from "./JobVacancy";
import { UserStatus } from "./UserStatus";
import { UserRole } from "./UserRole";

@Index("fk_user_userstatus1_idx", ["userStatusId"], {})
@Index("username_UNIQUE", ["username"], { unique: true })
@Entity("user", { schema: "recruitment_management" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "username",
    nullable: true,
    unique: true,
    length: 45,
  })
  username: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 600 })
  password: string | null;

  @Column("varchar", {
    name: "photo_filename",
    nullable: true,
    length: 100,
    default: () => "'avatar.png'",
  })
  photoFilename: string | null;

  @Column("varchar", { name: "email", length: 45, default: () => "'not set'" })
  email: string;

  @Column("char", { name: "mobile", length: 10, default: () => "'not set'" })
  mobile: string;

  @Column("date", { name: "added_date" })
  addedDate: string;

  @Column("int", { name: "user_status_id" })
  userStatusId: number;

  @OneToMany(
    () => CandidateProfile,
    (candidateProfile) => candidateProfile.user
  )
  candidateProfiles: CandidateProfile[];

  @OneToMany(
    () => CandidateProfile,
    (candidateProfile) => candidateProfile.reviewUser
  )
  candidateProfiles2: CandidateProfile[];

  @OneToMany(() => JobVacancy, (jobVacancy) => jobVacancy.user)
  jobVacancies: JobVacancy[];

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_status_id", referencedColumnName: "id" }])
  userStatus: UserStatus;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
