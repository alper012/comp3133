import { schemas } from "../schemas/index.js";
import { GraphQLError } from "graphql";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { hash, compare } = bcryptjs;
const { sign } = jwt;

export default {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      const userExists = await schemas.user.findOne({ email });

      if (userExists) {
        throw new GraphQLError(
          "Found already registered user with the email!" + email
        );
      }

      const encryptedPassword = await hash(password, 10);

      const user = new schemas.user({
        username: username,
        email: email,
        password: encryptedPassword,
      });

      const token = sign(
        { user_id: user._id, email },
        "efhlşwekrgjcnmö4r8947",
        { expiresIn: "12h" }
      );

      user.token = token;

      const res = user.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async createEmployee(_, { employeeInput: { id, first_name, last_name } }) {
      if (first_name && last_name) {
        const employee = new schemas.employee({
          id: id,
          first_name: first_name,
          last_name: last_name,
        });

        employee.save();

        console.log(`Created employee with ID: ${id}`);
      } else {
        throw new GraphQLError("Bot first name and last name is required!");
      }
    },

    async deleteEmployee(_, { employeeOperationsInput: { id } }) {
      return await schemas.employee.deleteOne({ id: id });
    },

    async updateEmployee(_, { employeeInput: { id, first_name, last_name } }) {
      return await schemas.employee.updateOne(
        { id: id },
        {
          first_name,
          last_name,
        }
      );
    },
  },

  Query: {
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await schemas.user.findOne({ email });

      if (user && compare(password, user.password)) {
        const token = sign(
          { user_id: user._id, email },
          "efhlşwekrgjcnmö4r8947",
          { expiresIn: "12h" }
        );

        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new GraphQLError("Incorrect password!" + email);
      }
    },

    async getAllEmployees(_) {
      return schemas.employee.find();
    },

    async getEmployeeByID(_, { employeeOperationsInput: { id } }) {
      return await schemas.employee.findOne({ id: id });
    },
  },
};
