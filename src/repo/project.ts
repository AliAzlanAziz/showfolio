import Project from "../schema/project";

const findById = (id: string) => {
  return Project.findById(id)
}

const findByIdAndUpdate = (id: string, updatedProject: any) => {
  return Project.findByIdAndUpdate(id, updatedProject, { runValidators: true });
}

const findByQueryObject = (queryObj: any) => {
  return Project.find(queryObj)
}

const deleteById = (id: string) => {
  return Project.findByIdAndDelete(id);
}

const deleteMultipleByQueryObject = (queryObj: any) => {
  return Project.deleteMany(queryObj);
}

export default {
  findById,
  findByIdAndUpdate,
  findByQueryObject,
  deleteById,
  deleteMultipleByQueryObject
}  