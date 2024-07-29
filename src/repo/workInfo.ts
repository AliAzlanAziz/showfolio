import WorkInfo from "../schema/workInfo";

const findById = (id: string) => {
  return WorkInfo.findById(id)
}

const findByIdAndUpdate = (id: string, updatedWorkInfo: any) => {
  return WorkInfo.findByIdAndUpdate(id, updatedWorkInfo);
}

const findByQueryObject = (queryObj: any) => {
  return WorkInfo.find(queryObj)
}

const deleteById = (id: string) => {
  return WorkInfo.findByIdAndDelete(id);
}

const deleteMultipleByQueryObject = (queryObj: any) => {
  return WorkInfo.deleteMany(queryObj);
}

export default {
  findById,
  findByIdAndUpdate,
  findByQueryObject,
  deleteById,
  deleteMultipleByQueryObject
}  