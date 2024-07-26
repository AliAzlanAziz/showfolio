import { faker } from "@faker-js/faker";
import User from "../schema/user";
import { generateUser } from "./generateUser"
import { generateCertificate, generateEducation, generateExperience } from "./generateWorkInfo";
import WorkInfo from "../schema/workInfo";
import Project from "../schema/project";
import { generateProject } from "./generateProject";
import View from "../schema/view";
import { generateView } from "./generateView";
import Award from "../schema/award";
import { generateAward } from "./generateAward";

export const insertDummyData = async () => {
  try{
    // generate 100 users
    const users = faker.helpers.multiple(generateUser, {
      count: 30,
    });
    await User.insertMany(users);

    // for each user generate 1 to 2 workInfos, projects, awards 
    let workInfos = [];
    let projects = [];
    let awards = [];
    for(let i=0; i<users.length; i++){
    // const randomNumber = 2;
      const randomNumber = getRandomNumber(1, 2);

      for(let j=1; j<=randomNumber; j++){
        workInfos.push(generateEducation(users[i]._id.toString()))
        workInfos.push(generateExperience(users[i]._id.toString()))
        workInfos.push(generateCertificate(users[i]._id.toString()))
        projects.push(generateProject(users[i]._id.toString()))
        awards.push(generateAward(users[i]._id.toString()))
      }
    }
    await WorkInfo.insertMany(workInfos);
    await Project.insertMany(projects);
    await Award.insertMany(awards);

    let views = [];
    for(let i=0; i<users.length; i++){
    const randomNumber = getRandomNumber(4, 6);

      for(let j=1; j<=randomNumber; j++){
        const toUser = getRandomNumber(0, users.length-1)

        views.push(generateView(users[i]._id.toString(), users[toUser]._id.toString()))
      }
    }
    await View.insertMany(views);
  }catch(error){
    console.log(error)
  }
}

function getRandomNumber(min=0, max=100) {
  if (min > max) {
    throw new Error('The min value should be less than or equal to the max value.');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
