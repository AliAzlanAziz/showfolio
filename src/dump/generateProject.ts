import { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { projs } from "./dummyProj";

export const generateProject = (user: any) => {
  const randomNumber = getRandomNumber(0, projs.length-1);
  const from = faker.date.past({years: 2})
  const to = faker.date.recent({days: 60})
  
  return {
    _id: new Types.ObjectId(),
    user: user,
    title: projs[randomNumber].title,
    desc: projs[randomNumber].desc,
    contrib: projs[randomNumber].contrib,
    from: from,
    to: to,
    imageUrl: faker.image.url({width: 500, height: 500}) 
  }
}

function getRandomNumber(min=0, max=100) {
  if (min > max) {
    throw new Error('The min value should be less than or equal to the max value.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

