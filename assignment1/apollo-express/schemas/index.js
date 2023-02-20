import { model, Schema } from "mongoose";

export const schemas = {
  user: model(
    "User",
    new Schema(
      {
        username: String,
        email: String,
        password: String,
        token: String,
      },
      { versionKey: false }
    )
  ),

  employee: model(
    "Employee",
    new Schema(
      {
        id: String,
        first_name: String,
        last_name: String,
      },
      { versionKey: false }
    )
  ),
};
