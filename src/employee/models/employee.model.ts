import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

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

  @Field((type) => Int, { nullable: true })
  spends?: number;

  @Field((type) => Float, { nullable: true })
  tax?: number;
}
