/* eslint-disable */
const {AppIcon} = require('../../app/model/');
const {DateUtil} = require('../../app/lib/');

module.exports = [
  {
    model: AppIcon,
    items: [
      /* 1 */
      {
        "updatedAt" : new Date("2017-12-26T09:37:05.206Z"),
        "createdAt" : new Date("2017-12-26T09:37:05.206Z"),
        "remark" : "sdfsdfsd",
        "enable": true,
        "startTime" : DateUtil.getDate(null, -1),
        "endTime" : DateUtil.getDate(null, 1),
        "tabIcons" : [
          {
            "unselect" : "1",
            "select" : "sdfsdfsdf",
            "label" : "主页",
            "name" : "main"
          },
          {
            "unselect" : "sdfsdf",
            "select" : "fsdfsdfsdfsdf",
            "label" : "投资页",
            "name" : "investment"
          },
          {
            "unselect" : "sdfsdf",
            "select" : "sdfsdfs",
            "label" : "挖宝页",
            "name" : "treasure"
          },
          {
            "unselect" : "sdfsfsd",
            "select" : "fsdfsdfs",
            "label" : "个人页",
            "name" : "people"
          }
        ],
        "__v" : 0
      },
      {
        "updatedAt" : new Date(DateUtil.getDate(null, 1)),
        "createdAt" : new Date(),
        "remark" : "sdfsdfsd",
        "enable": true,
        "startTime" : DateUtil.getDate(null, -1),
        "endTime" : DateUtil.getDate(null, 1),
        "tabIcons" : [
          {
            "unselect" : "mainaaaaaaaaa",
            "select" : "mainbbbbbbbbbb",
            "label" : "主页",
            "name" : "main"
          },
          {
            "unselect" : "investmentsdfsdf",
            "select" : "investmentfsdfsdfsdfsdf",
            "label" : "投资页",
            "name" : "investment"
          },
          {
            "unselect" : "treasuresdfsdf",
            "select" : "treasuresdfsdfs",
            "label" : "挖宝页",
            "name" : "treasure"
          },
          {
            "unselect" : "peoplesdfsfsd",
            "select" : "peoplefsdfsdfs",
            "label" : "个人页",
            "name" : "people"
          }
        ],
        "__v" : 0
      }
    ]
  }
];
