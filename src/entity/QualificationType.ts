import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CandidateQualification } from "./CandidateQualification";

@Entity("qualification_type", { schema: "recruitment_management" })
export class QualificationType {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(
    () => CandidateQualification,
    (candidateQualification) => candidateQualification.qualificationType
  )
  candidateQualifications: CandidateQualification[];
}
