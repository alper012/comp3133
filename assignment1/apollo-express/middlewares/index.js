import { GraphQLError } from "graphql";
import { verify } from "jsonwebtoken";

export default (context) => {
  const auth_header = context.req.headers.authorization;

  if (auth_header) {
    const token = auth_header.split("Bearer")[1];

    if (token) {
      try {
        const user = verify(token, "efhlşwekrgjcnmö4r8947");

        return user;
      } catch (err) {
        throw new GraphQLError("Invalid or Expired Token!");
      }
    }

    throw new GraphQLError("Bearer token not found!");
  }

  throw new GraphQLError("Authentication header not found!");
};
