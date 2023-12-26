import { Injectable, Logger } from '@nestjs/common';
import { DepartmentSeeder } from 'src/department/seeder/department.seeder';
import { ServiceSeeder } from 'src/department/seeder/service.seeder';
import { RolesSeeder } from 'src/user/seeder/roles.seeder';
import { Seeder } from './seeder.interface';

@Injectable()
export class SeederManager {
  private readonly seeders: Array<Seeder>;

  constructor(
    private readonly serviceSeeder: ServiceSeeder,
    private readonly departmentSeeder: DepartmentSeeder,
    private readonly roleSeeder: RolesSeeder,
  ) {
    this.seeders = [serviceSeeder, departmentSeeder, roleSeeder];
  }

  async runSeeders(): Promise<void> {
    const runSeeder = process.env.RUN_SEEDER === 'true' ? true : false;
    if (!runSeeder) {
      return;
    }
    for (const seeder of this.seeders) {
      await this.runSeeder(seeder);
    }
  }

  private async runSeeder(seeder: Seeder): Promise<void> {
    try {
      Logger.log(`Seeding ${seeder.constructor.name}...`);
      await seeder.seed();
      Logger.log(`${seeder.constructor.name} seeded successfully.`);
    } catch (error) {
      Logger.error(
        `Error seeding ${seeder.constructor.name}: ${error.message}`,
      );
    }
  }
}
