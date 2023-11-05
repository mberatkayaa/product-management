const mongodb = require("mongodb");

const Movement = require("../models/movements");
const Product = require("../models/product");
const User = require("../models/user");
const { getDb } = require("./database");

const getPropValue = (obj, property) => {
  if (!obj) return;
  const arr = property.split(".");
  const prop = arr.shift();
  const newObj = obj[prop];
  if (arr.length === 0) {
    return newObj;
  }
  const newProperty = arr.join(".");
  return getPropValue(newObj, newProperty);
};

const modelCollectionPairs = [
  {
    model: Product,
    collection: "products",
    map: (obj) => {
      if (!obj) return;
      return new Product(
        getPropValue(obj, "code"),
        getPropValue(obj, "description"),
        getPropValue(obj, "stock"),
        getPropValue(obj, "_id").toString()
      );
    },
  },
  {
    model: Movement,
    collection: "movements",
    map: (obj) => {
      if (!obj) return;
      let prod;
      const prodId = getPropValue(obj, "prod.prodId");
      const prodCode = getPropValue(obj, "prod.prodCode");
      if (prodId || prodCode) prod = { prodId, prodCode };
      return new Movement(
        prod,
        getPropValue(obj, "description"),
        getPropValue(obj, "numberOfIO"),
        getPropValue(obj, "_id").toString()
      );
    },
  },
  {
    model: User,
    collection: "users",
    map: (obj) => {
      if (!obj) return;
      return new User(
        getPropValue(obj, "username"),
        getPropValue(obj, "password"),
        getPropValue(obj, "email"),
        getPropValue(obj, "authorized"),
        getPropValue(obj, "_id").toString()
      );
    },
  },
];

const dbHandler = (() => {
  const getCollectionForModel = (model) => {
    const element = modelCollectionPairs.find((x) => model instanceof x.model || model === x.model);
    if (element) return element.collection;
  };

  const getMapperForModel = (model) => {
    const element = modelCollectionPairs.find((x) => model instanceof x.model || model === x.model);
    if (element) return element.map;
  };

  const save = async (model) => {
    const collection = getCollectionForModel(model);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    let operation = () => {
      return db.collection(collection).insertOne(model);
    };
    if (model._id) {
      operation = () => {
        return db.collection(collection).updateOne({ _id: new mongodb.ObjectId(model._id) }, { $set: model.getForUpdate()[0] });
      };
    }
    const result = await operation();
    return result;
  };

  const getAll = async (modelType) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).find().toArray();
    return result.map(getMapperForModel(modelType));
  };

  const getMany = async (modelType, query) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).find(query).toArray();
    return result.map(getMapperForModel(modelType));
  };

  const getById = async (modelType, id) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db
      .collection(collection)
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
    return getMapperForModel(modelType)(result);
  };

  const getOne = async (modelType, query) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).find(query).next();
    return getMapperForModel(modelType)(result);
  };

  const editById = async (modelType, id, data) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).updateOne({ _id: new mongodb.ObjectId(id) }, { $set: data });
    return result;
  };

  const editMany = async (modelType, query, data) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).updateMany(query, { $set: data });
    return result;
  };

  const deleteById = async (modelType, id) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).deleteOne({ _id: new mongodb.ObjectId(id) });
    return result;
  };

  const deleteMany = async (modelType, query) => {
    const collection = getCollectionForModel(modelType);
    if (!collection) throw new Error("Can't find collection for specified model!");

    const db = getDb();
    const result = await db.collection(collection).deleteMany(query);
    return result;
  };

  return { save, getAll, getMany, getById, getOne, editById, editMany, deleteById, deleteMany };
})();

module.exports = dbHandler;
