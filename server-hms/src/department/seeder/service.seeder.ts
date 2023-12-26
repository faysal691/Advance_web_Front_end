import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'src/seeder/seeder.interface';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServiceSeeder implements Seeder {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async seed(): Promise<void> {
    const empty = (await this.serviceRepository.find()).length === 0;
    if (!empty) {
      return;
    }
    const serviceData = [
      { name: 'Medical Checkup', description: 'Routine health checkup' },
      { name: 'Dental Care', description: 'Dental health services' },
      {
        name: 'Orthopedic Consultation',
        description: 'Bone and joint specialist',
      },
      { name: 'Cardiology Exam', description: 'Heart health examination' },
      { name: 'Pediatric Services', description: 'Child healthcare' },
      { name: 'Ophthalmology Checkup', description: 'Eye examination' },
      { name: 'Gynecology Services', description: "Women's health services" },
      {
        name: 'Neurology Consultation',
        description: 'Nervous system specialist',
      },
      { name: 'Physical Therapy', description: 'Rehabilitation services' },
      { name: 'Allergy Testing', description: 'Identification of allergies' },
      { name: 'Psychiatry Session', description: 'Mental health consultation' },
      {
        name: 'Nutrition Counseling',
        description: 'Diet and nutrition advice',
      },
      { name: 'Chiropractic Care', description: 'Spinal health services' },
      {
        name: 'Urology Consultation',
        description: 'Urinary system specialist',
      },
      { name: 'Dermatology Exam', description: 'Skin health examination' },
      {
        name: 'ENT Services',
        description: 'Ear, nose, and throat examination',
      },
      {
        name: 'Pulmonology Consultation',
        description: 'Respiratory system specialist',
      },
      { name: 'Dietary Supplements', description: 'Health supplements' },
      {
        name: 'Sleep Disorder Clinic',
        description: 'Treatment for sleep disorders',
      },
    ];

    const serviceEntities = serviceData.map((data) =>
      this.serviceRepository.create(data),
    );
    // Reset the sequence to restart from 1
    // await this.serviceRepository.query(
    //   'ALTER SEQUENCE service_id_seq RESTART WITH 1;',
    // );
    await this.serviceRepository.save(serviceEntities);
  }
}
