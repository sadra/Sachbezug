import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field((type) => Int)
  monthlyBudget: number;

  @Field((type) => Int)
  companyId: number;

  @Field()
  companyName: string;
}
