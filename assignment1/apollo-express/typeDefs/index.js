export default `#graphql
    type User {
      username: String,
      email: String,
      password: String,
      token: String
    }

    type Employee {
      first_name: String
      last_name: String
    }

    input RegisterInput {
      username: String
      email: String
      password: String
    }

    input LoginInput {
      email: String
      password: String
    }

    input EmployeeInput {
      id: String
      first_name: String
      last_name: String
    }

    input EmployeeOperationsInput {
      id: String
    }

    type Mutation {
      registerUser(registerInput: RegisterInput): User
      createEmployee(employeeInput: EmployeeInput): Employee
      deleteEmployee(employeeOperationsInput: EmployeeOperationsInput): Employee
      updateEmployee(employeeInput: EmployeeInput): Employee
    }

    type Query {
      getAllEmployees: [Employee]
      loginUser(loginInput: LoginInput): User
      getEmployeeByID(employeeOperationsInput: EmployeeOperationsInput): Employee
    }
`;
