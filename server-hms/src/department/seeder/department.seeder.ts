import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { Service } from '../entities/service.entity';

@Injectable()
export class DepartmentSeeder implements Seeder {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async seed(): Promise<void> {
    const empty = (await this.departmentRepository.find()).length === 0;
    if (!empty) {
      return;
    }
    const services = await this.createServices();
    await this.createDepartments(services);
  }

  private async createServices(): Promise<Service[]> {
    const serviceNames = [
      'Emergency',
      'Radiology',
      'Cardiology',
      'Orthopedics',
    ];

    const serviceEntities = serviceNames.map((name) =>
      this.serviceRepository.create({ name }),
    );
    return this.serviceRepository.save(serviceEntities);
  }

  private async createDepartments(services: Service[]): Promise<void> {
    const departmentsData = [
      {
        name: 'Emergency',
        description: 'Handles emergency cases',
        services: [services[0]],
      },
      {
        name: 'Radiology',
        description: 'Deals with medical imaging',
        services: [services[1]],
      },
      {
        name: 'Cardiology',
        description: 'Specializes in heart-related issues',
        services: [services[2]],
      },
      {
        name: 'Orthopedics',
        description: 'Focuses on musculoskeletal issues',
        services: [services[3]],
      },
    ];

    const departmentEntities = departmentsData.map((data) =>
      this.departmentRepository.create(data),
    );
    // Reset the sequence to restart from 1
    // await this.departmentRepository.query(
    //   'ALTER SEQUENCE department_id_seq RESTART WITH 1;',
    // );
    await this.departmentRepository.save(departmentEntities);
  }
}
