import Subscription from "../schema/subscription";

const findById = (id: string) => {
  return Subscription.findById(id)
}

export default {
  findById,
}  