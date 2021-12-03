import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Privilege } from "./Privilege";

@Index("name_UNIQUE", ["name"], { unique: true })
@Entity("module", { schema: "recruitment_management" })
export class Module {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, unique: true, length: 45 })
  name: string | null;

  @OneToMany(() => Privilege, (privilege) => privilege.module)
  privileges: Privilege[];
}
