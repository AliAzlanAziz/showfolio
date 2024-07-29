import Award from "../schema/award";

const findById = (id: string) => {
  return Award.findById(id)
}

const findByIdAndUpdate = (id: string, updatedAward: any) => {
  return Award.findByIdAndUpdate(id, updatedAward);
}

const findByQueryObject = (queryObj: any) => {
  return Award.find(queryObj)
}

const deleteById = (id: string) => {
  return Award.findByIdAndDelete(id);
}

const deleteMultipleByQueryObject = (queryObj: any) => {
  return Award.deleteMany(queryObj);
}

export default {
  findById,
  findByIdAndUpdate,
  findByQueryObject,
  deleteById,
  deleteMultipleByQueryObject
}  