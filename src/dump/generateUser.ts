import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

export const generateUser = () => {
  const name = faker.person.middleName() + " " + faker.person.lastName()
  const username = name.replace(" ","").toLocaleLowerCase()
  const position = faker.person.jobTitle()

  return {
    _id: new Types.ObjectId(),
    name: name,
    username: username,
    email: `${username}@gmail.com`,
    password: "$2b$10$5aFz/BvPDuz8LTPc28/zJ.BUm/WgdFIId7pKzbdKl7Zm.Jrq.Hpvu",
    position: position,
    // phone: faker.helpers.fromRegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
    phone: "+925125151251",
    imageURL: faker.image.url({width: 500, height: 500}),
    desc: `My job title is ${position}. ${faker.lorem.lines(2)}`,
    fb: `https://www.facebook.com/${username}`,
    ig: `https://www.instagram.com/${username}`,
    yt: `https://www.youtube.com/${username}`,
    gh: `https://www.github.com/${username}`,
    tw: `https://www.twitter.com/${username}`,
    li: `https://www.linkedin.com/in/${username}`,
    web: `https://www.showfolio.io/portfolio/${username}`,
    address: {
      city: faker.location.city(),
      country: faker.location.country(),
      details: faker.lorem.lines(1)
    },
    languages: [
      generateLanguage()
    ],
    toWork: generateRandomBoolean(),
    toHire: generateRandomBoolean(),
    public: generateRandomBoolean(),
    paidDate: null,
    subsType: 3,
    code: "",
    validTill: null,
    tags: "",
    points: 0
  }
}

const generateLanguage = () => {
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Russian', 'Portuguese', 'Italian', 'Korean'
  ];
  const skillLevels = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  return {
    _id: new Types.ObjectId(),
    name: faker.helpers.arrayElement(languages),
    skillLevel: faker.helpers.arrayElement(skillLevels)
  };
}

const generateRandomBoolean = () => {
  const booleans = [true, false];

  return faker.helpers.arrayElement(booleans);
}