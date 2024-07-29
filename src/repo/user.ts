import User from "../schema/user";

const findById = (id: string) => {
  return User.findById(id);
}

const findByUsernameOrEmail = (username: string, email: string) => {
  return User.findOne().or([
    { email: email }, { username: username },
  ]);
}

const findOneByQueryObject = (queryObj: any) => {
  return User.findOne(queryObj);
}

const findBySearchQueryParams = (queryStrReg: RegExp, cityReg: RegExp, countryReg: RegExp, limit: number, page: number) => {
  return User.find({
    $or: [
      { name: { $regex: queryStrReg } },
      { username: { $regex: queryStrReg } },
      { position: { $regex: queryStrReg } },
      { tags: { $regex: queryStrReg } },
      { 'address.city': { $regex: cityReg } },
      { 'address.country': { $regex: countryReg } }
    ]
  })
  .sort({ points: 'desc' })
  .select({ _id: 1, name: 1, imageURL: 1, public: 1, subsType: 1, position: 1, address: 1, toWork: 1, toHire: 1 })
  .limit(Number(limit))
  .skip(Number(page) * Number(limit))
}

const findByIdAndUpdate = (id: string, updatedObject: any) => {
  return User.findByIdAndUpdate(id, updatedObject);
}

const deleteById = (id: string) => {
  return User.findByIdAndDelete(id);
}

export default {
  findById,
  findByUsernameOrEmail,
  findOneByQueryObject,
  findBySearchQueryParams,
  deleteById,
  findByIdAndUpdate
}  