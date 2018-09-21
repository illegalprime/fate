import Model from './Model'

export default class Command extends Model {

  static defaults() {
    return {
      model: 'command',
      target: null,
      methodName: null,
      args: [],
      run: null,
    };
  }
}

