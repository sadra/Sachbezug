import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class GroupedEmployeeInput {
  @Field((type) => Int, {
    description: `Amount of benefits left. (Minimum value is 0)`,
    nullable: true,
    defaultValue: 10,
  })
  @Min(0)
  minLeftBenefits?: number;

  @Field((type) => Int, {
    description: `In last N pas month. (Minimum value is 1)`,
    nullable: true,
    defaultValue: 1,
  })
  @Min(1)
  pastMonth?: number;
}
