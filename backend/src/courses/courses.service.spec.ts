import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService, PrismaService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debe crear un curso', async () => {
    const courseData = { name: 'Matemáticas', capacity: 2 };
    prisma.course.create = jest
      .fn()
      .mockResolvedValue({ id: '123', ...courseData });

    const course = await service.createCourse(courseData);
    expect(course).toEqual({ id: '123', ...courseData });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.course.create).toHaveBeenCalledWith({ data: courseData });
  });

  it('debe modificar el cupo de un curso', async () => {
    prisma.course.update = jest
      .fn()
      .mockResolvedValue({ id: '123', name: 'Matemáticas', capacity: 5 });

    const course = await service.updateCourseCapacity('123', 5);
    expect(course.capacity).toBe(5);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.course.update).toHaveBeenCalledWith({
      where: { id: '123' },
      data: { capacity: 5 },
    });
  });
});
