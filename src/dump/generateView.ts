import { Types } from "mongoose";
import { faker } from "@faker-js/faker";

export const generateView = (user: any, to: any) => {
  return {
    _id: new Types.ObjectId(),
    user: user,
    to: to,
    requested: generateRandomBoolean()
  }
}

const generateRandomBoolean = () => {
  const booleans = [true, false];

  return faker.helpers.arrayElement(booleans);
}