import _ from 'lodash'
import Entity from './models/Entity'
import Command from './models/Command'
const DB = 'fatedb';

const models = {
  Entity,
  Command
}

function modelFor(modelName) {
  let clazz = modelName.slice(0, 1).toUpperCase() + modelName.slice(1);
  return models[clazz];
}

function modelForRecord(record) {
  return modelFor(record.model);
}

export default class Store {
  pouch(modelName, selector, options) {
    return function() {
      return _.merge({
        database: DB,
        selector: _.merge({model: modelName}, selector),
      }, options)
    }
  }

  model(record) {
    let clazz = modelForRecord(record);
    return new clazz(record, this);
  }

  setPouch(pouch) {
    this.pouch = pouch;
  }

  find() {
    return this.pouch.get(DB, ...arguments);
  }

  create(modelName, attrs) {
    let clazz = modelFor(modelName);
    let record = clazz.createRecord(attrs);
    return new clazz(record, this);
  }

  createAndSave() {
    return this.create(...arguments).save();
  }

  save(record) {
    return this.pouch.post(DB, record);
  }

  update(record) {
    return this.pouch.put(DB, record);
  }

  destroy(record) {
    return this.pouch.remove(DB, record);
  }

}
