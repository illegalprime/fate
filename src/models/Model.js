import _ from 'lodash'

class Model {
  constructor(record, store) {
    this.record = record;
    this.store = store;
  }

  get(key) {
    return this.record[key];
  }

  set(key, value) {
    return this.record[key] = value;
  }

  save() {
    this.store.save(this.record);
  }

  update() {
    this.store.update(this.record);
  }

  destroy() {
    this.store.destroy(this.record);
  }

  static createRecord(attrs) {
    return _.merge(this.defaults(), attrs);
  }

  static defaults() {
    return {};
  }
}

export default Model;
