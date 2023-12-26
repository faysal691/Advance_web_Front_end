import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  created_by: number;
  @CreateDateColumn()
  created_at: Date;
  @Column({ nullable: true })
  updated_by: number;
  @UpdateDateColumn()
  updated_at: Date;
  @Column({ nullable: true })
  deleted_at: Date;
  @Column({ nullable: true })
  deleted_by: string;

  @BeforeInsert()
  setCreated_by(userId?: number) {
    this.created_by = userId || 1;
  }

  @BeforeInsert()
  setUpdated_by(userId?: number) {
    this.updated_by = userId || 1;
  }
}
