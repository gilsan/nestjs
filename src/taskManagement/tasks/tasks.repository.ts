import { EntityRepository, Repository } from "typeorm";
import { TasksEntity } from "./tasks.entity";



@EntityRepository(TasksEntity)
export class TasksRepository extends Repository<TasksEntity> {

}