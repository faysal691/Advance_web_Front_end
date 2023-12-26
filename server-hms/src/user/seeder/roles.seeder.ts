import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { Repository } from 'typeorm';
import { Roles } from '../entities/role.entity';

@Injectable()
export class RolesSeeder implements Seeder {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async seed(): Promise<void> {
    const empty = (await this.rolesRepository.find()).length === 0;
    if (!empty) {
      return;
    }
    const rolesData = [
      { name: 'Admin', is_active: true },
      { name: 'Manager', is_active: true },
      { name: 'Doctor', is_active: true },
      { name: 'Nurse', is_active: true },
      { name: 'Patient', is_active: true },
    ];

    const rolesEntities = rolesData.map((data) =>
      this.rolesRepository.create(data),
    );
    // Reset the sequence to restart from 1
    // await this.rolesRepository.query(
    //   'ALTER SEQUENCE roles_id_seq RESTART WITH 1;',
    // );
    await this.rolesRepository.save(rolesEntities);
  }
}
