import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsService, PrismaService],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe crear un estudiante', async () => {
    const studentData = { name: 'Juan Pérez', email: 'juan@example.com' };
    prisma.student.create = jest
      .fn()
      .mockResolvedValue({ id: '123', ...studentData });

    const student = await service.createStudent(studentData);
    expect(student).toEqual({ id: '123', ...studentData });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.student.create).toHaveBeenCalledWith({ data: studentData });
  });

  it('debe obtener un estudiante por ID', async () => {
    const studentData = {
      id: '123',
      name: 'Juan Pérez',
      email: 'juan@example.com',
    };
    prisma.student.findUnique = jest.fn().mockResolvedValue(studentData);

    const student = await service.getStudentById('123');
    expect(student).toEqual(studentData);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.student.findUnique).toHaveBeenCalledWith({
      where: { id: '123' },
      include: { enrollments: { include: { course: true } } },
    });
  });
});
