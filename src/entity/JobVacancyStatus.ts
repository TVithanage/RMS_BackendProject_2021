import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobVacancy } from "./JobVacancy";

@Entity("job_vacancy_status", { schema: "recruitment_management" })
export class JobVacancyStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @OneToMany(() => JobVacancy, (jobVacancy) => jobVacancy.jobVacancyStatus)
  jobVacancies: JobVacancy[];
}
