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
      stressTracks: [
        {
          name: "Physical",
          boxes: [
            {value: 1, checked: false},
            {value: 2, checked: false},
          ]
        },
        {
          name: "Mental",
          boxes: [
            {value: 1, checked: false},
            {value: 2, checked: false},
          ]
        },
      ],
      consequences: [
        {name: null, severity: 'Mild'},
        {name: null, severity: 'Moderate'},
        {name: null, severity: 'Severe'},
      ],
      extras: null,
      description: null,
    };
  }
}

