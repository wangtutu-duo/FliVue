export const tools = [
  {
    type: 'drag',
    icon: 'drag',
    name: '拖拽'
  },
  {
    type: 'connection',
    icon: 'fork',
    name: '连线'
  },
  {
    type: 'zoom-in',
    icon: 'zoom-in',
    name: '放大'
  },
  {
    type: 'zoom-out',
    icon: 'zoom-out',
    name: '缩小'
  },
  {
    type: 'check',
    icon: 'zoom-out',
    name: '检查'
  }
];

export const commonNodes = [
  {
    type: 'start',
    nodeName: '',
    nodeDesc: '开始',
    icon: 'StartIcon'
  },
  {
    type: 'end',
    nodeName: '',
    nodeDesc: '结束',
    icon: 'EndIcon'
  },
  {
    type: 'option',
    nodeName: '',
    icon: 'CommonIcon',
    nodeDesc: '人工可选'
  },
  {
    type: 'common',
    nodeName: '',
    icon: 'CommonIcon',
    nodeDesc: '人工处理',
    referNode: ''
  },
  {
    type: 'event',
    nodeName: '',
    icon: 'EventIcon',
    nodeDesc: '事件节点',
    eventFields: '',
  },
  {
    type: 'auto',
    nodeName: '',
    method: '',
    icon: 'autoIcon',
    nodeDesc: '自动节点',
  },

  {
    type: 'outgate',
    nodeName: '',
    nodeDesc: '分发',
    icon: 'GatewayIcon',
    quit:""  //强制结束，一般指的是新线程结束，其他并行的强制结束
  },
  {
    type: 'ingate',
    nodeName: '',
    nodeDesc: '合并',
    icon: 'GatewayIcon',
    pass:"",    //可以填数字或百分比
    script:"",  //通过脚本判断
    method:""   //每次调用后台判断方法

  },
  {
    type: 'commons',
    nodeName: '',
    icon: 'CommonIcon',
    nodeDesc: '多任务',

  },
  {
    type: 'threads',
    nodeName: '',
    method: '',
    icon: 'autoIcon',
    nodeDesc: '多线程',
    delay: '',
    interval: '',
    runCount: '',   //运行次数
  },
  {
    type: 'notice',
    nodeName: '',
    icon: 'autoIcon',
    nodeDesc: '通知',

  },
];

export const highNodes = [
  {
    type: 'childflow',
    nodeName: 'CHILD',
    icon: 'ChildFlowIcon',
    nodeDesc: '子流程',
  },
  {
    type: 'mark',
    nodeName: 'MARK',
    icon: 'ChildFlowIcon',
    nodeDesc: '备注',
  }

];

export const laneNodes = [
  {
    type: 'x-lane',
    nodeName: 'X_LANE',
    nodeDesc: '横向泳道',
    icon: 'XLaneIcon'
  },
  {
    type: 'y-lane',
    nodeName: 'Y_LANE',
    nodeDesc: '纵向泳道',
    icon: 'YLaneIcon'
  }
];
