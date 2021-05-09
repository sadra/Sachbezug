<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Sachbezug

### Is a NestJS GraphQL API service

> The business domain: every employee of a company has a certain budget to spend on vouchers from partners every month. If the spending of an employee in a certain month is higher than 44€, the employee has to “pay” 30% taxes from his or her net salary on the surplus amount which means that the tax advisor needs to account for it. (Background: in Germany, up to 44€ can be given tax free to an employee in forms of employee benefits ([Sachbezug](https://en.wikipedia.org/wiki/Employee_benefits)). There are other possible tax deductions in Germany as well, but they are not part of this challenge, but should be kept in mind when doing the code architecture)

The API should be able to answer the following three requests:

 - List all employees grouped by company that have more than 10€ in benefits left to spend this month. This query should be flexible in such a way that you can provide a past month as an argument as well.
 - A list of employees from a single company with their spending in a certain month. It should list the money per employee that was spent up to 44€ as tax free and the money above this threshold should be split up by net salary and taxes. There should also be a total per employee.
 - List the revenue per partner.

**Example Data:** Is located at [db directory](https://github.com/sadra/Sachbezug/tree/master/src/db).


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQL API

You can access to the GraphQL Api playground from the following adress.

```
localhost:3000/graphql
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Sadra Isapanah Amlashi](https://sadra.me)

## License

Nest is [MIT licensed](LICENSE).
