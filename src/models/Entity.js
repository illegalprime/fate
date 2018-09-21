import Model from './Model'

export default class Entity extends Model {

  static defaults() {
    return {
      model: 'entity',
      name: null,
      type: null,
      aspects: [],
      skills: [
        [null, null, null, null],
        [null, null, null],
        [null, null],
        [null],
        [],
      ],
      extras: [],
      stunts: [],
    };
  }
}

