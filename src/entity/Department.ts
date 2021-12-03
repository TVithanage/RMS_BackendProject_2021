import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobVacancy } from "./JobVacancy";

@Entity("department", { schema: "recruitment_management" })
export class Department {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 80 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 200 })
  description: string | null;

  @OneToMany(() => JobVacancy, (jobVacancy) => jobVacancy.department)
  jobVacancies: JobVacancy[];
}
