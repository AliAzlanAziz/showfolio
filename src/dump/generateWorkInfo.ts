import { Types } from "mongoose";
import WorkInfo from "../schema/workInfo";
import { exps } from "./dummyExp";
import { WorkInfoType } from "../enums/workInfoType.enum";
import { JobModeType } from "../enums/jobModeType.enum";
import { faker } from "@faker-js/faker";
import { edus } from "./dummyEdu";
import { certs } from "./dummyCert";

export const generateExperience = (user: any) => {
  const randomNumber = getRandomNumber(0, exps.length-1);
  const from = faker.date.past({years: 2})
  const to = faker.date.recent({days: 60})
  // console.log(exps[randomNumber])
  
  return {
    _id: new Types.ObjectId(),
    user: user,
    title: exps[randomNumber].title,
    desc: exps[randomNumber].desc,
    type: WorkInfoType.EXPERIENCE,
    jobMode: JobModeType.ONSITE,
    name: faker.company.name(),
    from: from,
    to: to,
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      details: faker.lorem.lines(1)
    },
    imageURL: faker.image.url({width: 500, height: 500}) 
  }
}

export const generateEducation = (user: any) => {
  const randomNumber = getRandomNumber(0, edus.length-1);
  const from = faker.date.past({years: 2})
  const to = faker.date.recent({days: 60})
  // console.log(edus[randomNumber])
  
  return {
    _id: new Types.ObjectId(),
    user: user,
    title: edus[randomNumber].title,
    desc: edus[randomNumber].desc,
    type: WorkInfoType.EDUCATION,
    name: edus[randomNumber].schoolName,
    from: from,
    to: to,
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      details: faker.lorem.lines(1)
    },
    imageURL: faker.image.url({width: 500, height: 500}) 
  }
}

export const generateCertificate = (user: any) => {
  const randomNumber = getRandomNumber(0, certs.length-1);
  const from = faker.date.past({years: 2})
  const to = faker.date.recent({days: 60})
  // console.log(certs[randomNumber])
  
  return {
    _id: new Types.ObjectId(),
    user: user,
    title: certs[randomNumber].title,
    desc: certs[randomNumber].desc,
    type: WorkInfoType.CERTIFICATE,
    name: certs[randomNumber].academy,
    from: from,
    to: to,
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      details: faker.lorem.lines(1)
    },
    imageURL: faker.image.url({width: 500, height: 500}) 
  }
}

function getRandomNumber(min=0, max=100) {
  if (min > max) {
    throw new Error('The min value should be less than or equal to the max value.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

