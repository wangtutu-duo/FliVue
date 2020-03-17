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
    type: 'auto',
    nodeName: '',
    method: '',
    icon: 'autoIcon',
    nodeDesc: '自动节点',
    delay: '',
    interval: '',
    maxcount: '',
    limit: '',
  },
  {
    type: 'event',
    nodeName: '',
    icon: 'EventIcon',
    nodeDesc: '事件节点',
    eventFields: '',
  },
  {
    type: 'outgate',
    nodeName: '',
    nodeDesc: '分发',
    icon: 'GatewayIcon'
  },
  {
    type: 'ingate',
    nodeName: '',
    nodeDesc: '合并',
    icon: 'GatewayIcon'
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
