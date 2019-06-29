import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { Messages } from '@kl/consts/messages/messages.portuguese';
import { HabitDTO } from './dto/habit.dto';

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async create(habitDTO: HabitDTO) {
    const habit = await this.habitRepository.create(habitDTO);
    await habit.save();
    return habit;
  }

  async findMany(habits: Habit[]) {
    return this.habitRepository.findByIds(habits); 
  }

  async findOne(id: number) {
    const habit = await this.habitRepository.findOneOrFail(id);
    return habit;
  }

  async findAll() {
      const habits = await this.habitRepository.find();
      if (await habits.length == 0 ){
        throw new NotFoundException(Messages.error.NOT_FOUND);
      }
      return habits;
  }
}