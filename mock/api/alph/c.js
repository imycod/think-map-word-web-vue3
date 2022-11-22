const Mock = require('mockjs')

const data = {
  conquest: {
    "type": "force",
    "categories": [
      {
        "name": "名词qqq",
        "keyword": {},
        "base": "名词11"
      },
      {
        "name": "动词",
        "keyword": {},
        "base": "动词"
      }
    ],
    "nodes": [
      {
        "id": "3000001",
        "name": "conquest",
        "value": 0,
        "category": 0,
        "x": -81.46074,
        "y": -104.20204
      },
      {
        "id": "3000002",
        "name": "conquer",
        "value": 1,
        "category": 1,
        "x": 0.64646,
        "y": -31.512747
      },
      {
        "id": "3000003",
        "name": "queen",
        "value": 2,
        "category": 0,
        "x": 82.80825,
        "y": -203.1144
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 0,
        "target": 2
      }
    ],
    "sentence": {
      "conquest": [
        {
          "name": "But ambition alone is not what drove him to conquest.",
          "soundUrl": "../assets/av/conquest1.mp4",
          "av": "../assets/av/conquest1_av.mp4"
        }
      ]
    }
  }
}

module.exports = [
  {
    url: '/c',
    type: 'get',
    response: config => {
      const { word } = config.query
      return {
        code: 20000,
        data: data[word]
      }
    }
  },
]

