import View from "../schema/view";

const findByQueryObject = (queryObj: any) => {
  return View.find(queryObj)
}

const findOneByQueryObject = (queryObj: any) => {
  return View.findOne(queryObj);
}

const deleteMultipleByQueryObject = (queryObj: any) => {
  return View.deleteMany(queryObj);
}

const countDocumentsByQueryObject = (queryObj: any) => {
  return View.countDocuments(queryObj);
}

const aggregateAllViewersByToUserId = (id: string) => {
  return View.aggregate([
    {
      $match: { to: id }
    },
    {
      $sort: { time: -1 }
    },
    {
      $group: {
        _id: '$user',
        doc: { $first: '$$ROOT' }
      }
    },
    {
      $replaceRoot: { newRoot: '$doc' }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    {
      $unwind: '$userDetails'
    },
    {
      $project: {
        _id: 1,
        user: {
          _id: '$userDetails._id',
          name: '$userDetails.name',
          imageURL: '$userDetails.imageURL',
          public: '$userDetails.public',
          subsType: '$userDetails.subsType'
        },
        requested: 1
      }
    }
  ]);
}

export default {
  findByQueryObject,
  findOneByQueryObject,
  deleteMultipleByQueryObject,
  countDocumentsByQueryObject,
  aggregateAllViewersByToUserId
}  