import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Family } from './family.entity';
import { FamilyMember, FamilyRole } from './family-member.entity';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private readonly familiesRepo: Repository<Family>,
    @InjectRepository(FamilyMember)
    private readonly membersRepo: Repository<FamilyMember>,
  ) {}

  async create(ownerUserId: string, name: string): Promise<Family> {
    const family = this.familiesRepo.create({
      name: name.trim(),
      ownerUserId,
    });
    const saved = await this.familiesRepo.save(family);

    await this.membersRepo.save(
      this.membersRepo.create({
        familyId: saved.id,
        userId: ownerUserId,
        role: FamilyRole.OWNER,
      }),
    );

    return saved;
  }

  async findByUser(userId: string): Promise<Family[]> {
    const memberships = await this.membersRepo.find({
      where: { userId },
      relations: ['family'],
    });
    return memberships.map((m) => m.family);
  }

  async findOne(id: string, userId: string): Promise<Family> {
    const family = await this.familiesRepo.findOne({
      where: { id },
      relations: ['devices'],
    });
    if (!family) throw new NotFoundException('Família não encontrada');

    const membership = await this.membersRepo.findOne({
      where: { familyId: id, userId },
    });
    if (!membership) {
      throw new ForbiddenException('Você não tem acesso a esta família');
    }

    return family;
  }

  async ensureUserBelongsToFamily(familyId: string, userId: string) {
    const membership = await this.membersRepo.findOne({
      where: { familyId, userId },
    });
    if (!membership) {
      throw new ForbiddenException('Acesso negado a esta família');
    }
    return membership;
  }
}
