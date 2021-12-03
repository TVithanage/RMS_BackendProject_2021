import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "./Department";
import { JobCategory } from "./JobCategory";
import { JobVacancyStatus } from "./JobVacancyStatus";
import { User } from "./User";

@Index("fk_job_vacancy_department1_idx", ["departmentId"], {})
@Index("fk_job_vacancy_job_category1_idx", ["jobCategoryId"], {})
@Index("fk_job_vacancy_job_vacancy_status1_idx", ["jobVacancyStatusId"], {})
@Index("fk_job_vacancy_user1_idx", ["userId"], {})
@Entity("job_vacancy", { schema: "recruitment_management" })
export class JobVacancy {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("varchar", { name: "position", length: 100 })
  position: string;

  @Column("varchar", { name: "description", nullable: true, length: 200 })
  description: string | null;

  @Column("varchar", { name: "location", length: 100 })
  location: string;

  @Column("date", { name: "added_date" })
  addedDate: string;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "department_id" })
  departmentId: number;

  @Column("int", { name: "job_category_id" })
  jobCategoryId: number;

  @Column("int", { name: "job_vacancy_status_id" })
  jobVacancyStatusId: number;

  @ManyToOne(() => Department, (department) => department.jobVacancies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "department_id", referencedColumnName: "id" }])
  department: Department;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.jobVacancies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "job_category_id", referencedColumnName: "id" }])
  jobCategory: JobCategory;

  @ManyToOne(
    () => JobVacancyStatus,
    (jobVacancyStatus) => jobVacancyStatus.jobVacancies,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "job_vacancy_status_id", referencedColumnName: "id" }])
  jobVacancyStatus: JobVacancyStatus;

  @ManyToOne(() => User, (user) => user.jobVacancies, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
