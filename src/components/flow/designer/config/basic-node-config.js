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
		type: 'common', 
		nodeName: '',
		icon: 'CommonIcon',
    nodeDesc:'人工必做'
	},
  {
    type: 'option',
    nodeName: '',
    icon: 'CommonIcon',
    nodeDesc:'人工可选'
  },
	{
		type: 'auto',
		nodeName: '',
		icon: 'autoIcon',
    nodeDesc:'自动节点'
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

	{
		type: 'event', 
		nodeName: '',
		icon: 'EventIcon',
    nodeDesc:'事件节点',
    trigger:''
	}
];

export const highNodes = [
	{
		type: 'child-flow', 
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
