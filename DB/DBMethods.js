import userModel from './model/user.model.js'
//findOne
export const findOne = async({model,filter={},select='',populate=[]}={})=>{
    const result = await model.findOne(filter).select(select).populate(populate)
    return result
}
// find
export const find = async({model,filter={},select='',populate=[],skip=0,limit=5}={})=>{
    const result = await model.find(filter).limit(limit).skip(skip).select(select).populate(populate)
    return result
}
// findById
export const findById = async({model,filter={},select='',populate=[]}={})=>{
    const result = await model.findById(filter).select(select).populate(populate)
    return result
}

// create
export const create = async({model,data={}}={})=>{
    const result = await model.create(data)
    return result
}
// insertMany
export const insertMany = async({model,data=[{}]}={})=>{
    const result = await model.insertMany(data).select(select).populate(populate)
    return result
}
// save
export const createAndSave = async({model,data={}}={})=>{
    const newObj = new model(data);
    const savedObj= await newObj.save();
    return savedObj
}
//findOneAndUpdate
export const findOneAndUpdate = async({model,filter={},data={},options={},select='',populate=[]}={})=>{
    const result = await model.findOneAndUpdate(filter,data,options).select(select).populate(populate)
    return result
}
// findByIdAndUpdate

export const findByIdAndUpdate = async ({ model, filter = {}, data = {}, options = {}, select = "", populate = [] } = {}) => {
    const result = await model.findByIdAndUpdate(filter, data, options).select(select).populate(populate)
    return result
}
// updateOne

export const updateOne = async ({ model, filter = {}, data = {} } = {}) => {
    const result = await model.updateOne(filter, data)
    return result
}
// delete
export const findOneAndDelete = async ({ model, filter = {}, data = {}, select = "", populate = [] } = {}) => {
    const result = await model.findOneAndDelete(filter, data).select(select).populate(populate)
    return result
}


export const findByIdAndDelete = async ({ model, filter = {}, data = {}, select = "", populate = [] } = {}) => {
    const result = await model.findByIdAndDelete(filter, data).select(select).populate(populate)
    return result
}

export const deleteOne = async ({ model, filter = {}, data = {} } = {}) => {
    const result = await model.deleteOne(filter, data)
    return result
}