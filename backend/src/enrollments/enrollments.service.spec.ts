import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsService } from './enrollments.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentsService, PrismaService],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debe inscribir a un estudiante en un curso con cupos disponibles', async () => {
    prisma.course.findUnique = jest
      .fn()
      .mockResolvedValue({ id: 'course1', capacity: 2, enrollments: [] });
    prisma.enrollment.create = jest
      .fn()
      .mockResolvedValue({ id: 'enrollment1' });

    const enrollment = await service.enrollStudent('student1', 'course1');
    expect(enrollment).toEqual({ id: 'enrollment1' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.enrollment.create).toHaveBeenCalled();
  });

  it('debe lanzar un error si el curso está lleno', async () => {
    prisma.course.findUnique = jest
      .fn()
      .mockResolvedValue({ id: 'course1', capacity: 2, enrollments: [{}, {}] });

    await expect(service.enrollStudent('student1', 'course1')).rejects.toThrow(
      BadRequestException,
    );
  });
});
