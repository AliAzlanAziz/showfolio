import { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { awards } from "./dummyAward";

export const generateAward = (user: any) => {
  const randomNumber = getRandomNumber(0, awards.length-1);
  const from = faker.date.past({years: 2})
  const to = faker.date.recent({days: 60})
  
  return {
    _id: new Types.ObjectId(),
    user: user,
    title: awards[randomNumber].title,
    desc: awards[randomNumber].desc,
    from: from,
    to: to,
    imageURL: faker.image.url({width: 500, height: 500}) 
  }
}

function getRandomNumber(min=0, max=100) {
  if (min > max) {
    throw new Error('The min value should be less than or equal to the max value.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

