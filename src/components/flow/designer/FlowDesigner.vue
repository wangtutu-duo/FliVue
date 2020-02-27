<template>
  <div v-loading="loading" style="height: 100%;"
       @mousedown="inside"
       v-mousedown-outside="outside">
    <a-layout class="container">
      <a-layout-sider
        width="300"
        theme="light"
        class="select-area">
        <a-row>
          <a-checkable-tag v-model="tag.checked0" @change="toggleNodeShow0" class="tag">工具</a-checkable-tag>
          <div align="center">
            <a-list
              :grid="{ gutter: 8, column: 1 }"
              v-if="tag.toolShow">
              <a-list-item>
                <a-button-group>
                  <a-button
                    v-for="(tool, index) in field.tools"
                    :key="index"
                    :icon="tool.icon"
                    :type="currentTool.type == tool.type ? 'primary': 'default'"
                    @click="selectTool(tool.type)">
                  </a-button>
                </a-button-group>
              </a-list-item>
            </a-list>
          </div>
        </a-row>
        <a-row>
          <a-checkable-tag v-model="tag.checked1" @change="toggleNodeShow1" class="tag">基础节点</a-checkable-tag>
          <div align="center">
            <a-list
              :grid="{ gutter: 8, column: 2 }"
              v-if="tag.commonNodeShow">
              <a-list-item v-for="(commonNode, index) in field.commonNodes" :key="index">
                <div class="node-item" :type="commonNode.type" belongto="commonNodes">
                  <a-icon :component="commonNode.icon"/>
                  {{ commonNode.nodeDesc }}
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-row>
        <a-row>
          <a-checkable-tag v-model="tag.checked2" @change="toggleNodeShow2" class="tag">高级节点</a-checkable-tag>
          <div align="center">
            <a-list
              :grid="{ gutter: 8, column: 2 }"
              v-if="tag.highNodeShow">
              <a-list-item v-for="(highNode, index) in field.highNodes" :key="index">
                <div class="node-item" :type="highNode.type" belongto="highNodes">
                  <a-icon :component="highNode.icon"/>
                  {{ highNode.nodeDesc }}
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-row>
        <a-row>
          <a-checkable-tag v-model="tag.checked3" @change="toggleNodeShow3" class="tag">泳道节点</a-checkable-tag>
          <div align="center">
            <a-list
              :grid="{ gutter: 8, column: 2 }"
              v-if="tag.laneNodeShow">
              <a-list-item v-for="(laneNode, index) in field.laneNodes" :key="index">
                <div class="node-item" :type="laneNode.type" belongto="laneNodes">
                  <a-icon :component="laneNode.icon"/>
                  {{ laneNode.nodeDesc }}
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-row>
        {{linkinfo}}
        <br>
        {{nodeinfo}}
        <br>
        {{errorMsg}}
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header-option">
          <a-tooltip title="保存流程" placement="bottom">
            <a-button @click="saveFlow" class="header-option-button" size="small" icon="save"></a-button>
          </a-tooltip>
          <a-tooltip title="生成流程图片" placement="bottom">
            <a-button @click="exportFlowPicture" class="header-option-button" size="small" icon="picture"></a-button>
          </a-tooltip>
          <a-popconfirm title="确认要重新加载吗？" placement="bottom" okText="确认" cancelText="取消" @confirm="loadFlowData">
            <a-tooltip title="重新加载" placement="bottom">
              <a-button class="header-option-button" size="small" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
          <a-popconfirm title="确认要重新绘制吗？" placement="bottom" okText="确认" cancelText="取消" @confirm="clear">
            <a-tooltip title="重新绘制" placement="bottom">
              <a-button class="header-option-button" size="small" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
          <a-tooltip :title="flowData.config.showGridText" placement="bottom">
            <a-button
              @click="toggleShowGrid"
              class="header-option-button"
              size="small"
              :icon="flowData.config.showGridIcon">
            </a-button>
          </a-tooltip>
          <a-tooltip title="设置" placement="bottom">
            <a-button @click="setting" class="header-option-button" size="small" icon="setting"></a-button>
          </a-tooltip>
          <a-popconfirm
            title="请选择帮助项："
            placement="bottom"
            okType="default"
            okText="快捷键大全"
            cancelText="使用文档"
            @confirm="shortcutHelper"
            @cancel="usingDoc">
            <a-icon slot="icon" type="question-circle-o" style="color: red"/>
            <a-tooltip title="帮助" placement="bottom">
              <a-button class="header-option-button" size="small" icon="book"></a-button>
            </a-tooltip>
          </a-popconfirm>
          <a-tooltip title="退出" placement="bottom">
            <a-button @click="exit" class="header-option-button" size="small" icon="logout"></a-button>
          </a-tooltip>
          <a-tooltip title="字段" placement="bottom">
            <a-button @click="exit" class="header-option-button" size="small" icon="logout"></a-button>
          </a-tooltip>
        </a-layout-header>
        <a-layout-content class="content">
          <flow-area
            ref="flowArea"
            :browserType="browserType"
            :flowData="flowData"
            :select.sync="currentSelect"
            :selectGroup.sync="currentSelectGroup"
            :plumb="plumb"
            :currentTool="currentTool"
            :flow-container="flowContainer()"
            @findNodeConfig="findNodeConfig"
            @selectTool="selectTool"
            @getShortcut="getShortcut"
            @flowdatachange="flowdatachange"
            @saveFlow="saveFlow">
          </flow-area>
          <vue-context-menu
            :contextMenuData="linkContextMenuData"
            @deleteLink="deleteLink">
          </vue-context-menu>
        </a-layout-content>
        <a-layout-footer class="foot">

        </a-layout-footer>
      </a-layout>
      <a-layout-sider
        width="350"
        theme="light"
        class="attr-area"
      >
        <flow-attr :plumb="plumb" :flowData="flowData" :select.sync="currentSelect"></flow-attr>
      </a-layout-sider>
    </a-layout>
    <a-modal
      :title="'流程设计图_' + flowData.attr.id + '.png'"
      centered
      width="90%"
      :closable="flowPicture.closable"
      :maskClosable="flowPicture.maskClosable"
      :visible="flowPicture.modalVisible"
      okText="下载到本地"
      cancelText="取消"
      @ok="downLoadFlowPicture"
      @cancel="cancelDownLoadFlowPicture">
      <div align="center">
        <img :src="flowPicture.url"/>
      </div>
    </a-modal>
    <setting-modal ref="settingModal"></setting-modal>
    <shortcut-modal ref="shortcutModal"></shortcut-modal>
    <test-modal ref="testModal" @loadFlow="loadFlow"></test-modal>
  </div>
</template>

<script>
  import jsplumb from 'jsplumb'
  import {tools, commonNodes, highNodes, laneNodes} from './config/basic-node-config.js'
  import {flowConfig} from './config/args-config.js'
  import {
    startSvg,
    endSvg,
    commonSvg,
    autoSvg,
    gatewaySvg,
    eventSvg,
    childFlowSvg,
    xLaneSvg,
    yLaneSvg,
    lanePoolSvg
  } from './config/basic-icon-config.js'
  import $ from 'jquery'
  import 'jquery-ui/ui/widgets/draggable'
  import 'jquery-ui/ui/widgets/droppable'
  import 'jquery-ui/ui/widgets/resizable'
  import html2canvas from 'html2canvas'
  import canvg from 'canvg'
  import {ZFSN} from './util/ZFSN.js'
  import FlowArea from './modules/FlowArea'
  import FlowAttr from './modules/FlowAttr'
  import SettingModal from './modules/SettingModal'
  import ShortcutModal from './modules/ShortcutModal'
  import UsingDocModal from './modules/UsingDocModal'
  import TestModal from './modules/TestModal'
  import axios from '@/utils/axios.js'

  export default {
    name: 'flowDesigner',
    components: {
      jsplumb,
      flowConfig,
      html2canvas,
      canvg,
      FlowArea,
      FlowAttr,
      SettingModal,
      ShortcutModal,
      UsingDocModal,
      TestModal,
      StartIcon: {template: startSvg},
      EndIcon: {template: endSvg},
      CommonIcon: {template: commonSvg},
      autoIcon: {template: autoSvg},
      GatewayIcon: {template: gatewaySvg},
      EventIcon: {template: eventSvg},
      ChildFlowIcon: {template: childFlowSvg},
      XLaneIcon: {template: xLaneSvg},
      YLaneIcon: {template: yLaneSvg},
      LanePoolIcon: {template: lanePoolSvg}
    },
    props: {
      flowId: String,
      flowName: String
    },
    mounted() {
      const that = this;
      that.dealCompatibility();
      that.initNodeSelectArea();
      that.initJsPlumb();
      that.listenShortcut();
      that.initFlow();
      that.listenPage();

      setTimeout(function () {
        ZFSN.consoleLog([
          '欢迎使用VFD流程设计器!',
          '当前版本：' + that.info.version,
          'Powered by ' + that.info.author,
          '码云：' + that.info.gitee
        ]);
        that.$notification.open({
          placement: 'bottomRight',
          message: '欢迎使用流程设计器!',
          description: "欢迎"
        });
      }, 1000);
    },
    data() {
      return {
        info: {
          version: '1.0.5',
          author: 'ZSFN',
          gitee: 'https://gitee.com/yjblogs/VFD'
        },
        tag: {
          checked0: true,
          checked1: true,
          checked2: true,
          checked3: true,
          toolShow: true,
          commonNodeShow: true,
          highNodeShow: true,
          laneNodeShow: true
        },
        linkinfo: "",
        nodeinfo: "",
        errorMsg: "",
        browserType: 3,
        plumb: {},
        field: {
          tools: tools,
          commonNodes: commonNodes,
          highNodes: highNodes,
          laneNodes: laneNodes
        },
        flowData: {
          nodeList: [],
          linkList: [],
          attr: {
            id: '',
            name: 'flow',
            desc: '流程图',
            version: '1.0',
            status: "released" // creating   released, other
          },
          config: {
            showGrid: true,
            showGridText: '隐藏网格',
            showGridIcon: 'eye'
          },
          status: flowConfig.flowStatus.CREATE,
          remarks: []
        },
        currentTool: {
          type: 'drag',
          icon: 'drag',
          name: '拖拽'
        },
        loading: false,
        focus: false,
        currentSelect: {},
        currentSelectGroup: [],
        activeShortcut: true,
        linkContextMenuData: flowConfig.contextMenu.link,
        flowPicture: {
          url: '',
          modalVisible: false,
          closable: false,
          maskClosable: false
        }
      }
    },
    created() {
      let m1 = {};
      m1["menuName"] = "F" + ZFSN.getId();
      m1["axis"] = flowConfig.contextMenu.link.axis;
      m1["menulists"] = flowConfig.contextMenu.link.menulists;
      this.linkContextMenuData = m1;
    },
    methods: {

      toggleNodeShow0(flag) {
        if (!flag) {
          this.tag.toolShow = false;
        } else {
          this.tag.toolShow = true;
        }
      },
      toggleNodeShow1(flag) {
        if (!flag) {
          this.tag.commonNodeShow = false;
        } else {
          this.tag.commonNodeShow = true;
        }
      },
      toggleNodeShow2(flag) {
        if (!flag) {
          this.tag.highNodeShow = false;
        } else {
          this.tag.highNodeShow = true;
        }
      },
      inside: function () {
        this.focus = true;
        this.listenShortcut();

      },
      outside: function () {
        this.focus = false;
        this.listenShortcut();
        console.debug(this.flowId + "unfocus")
      },
      toggleNodeShow3(flag) {
        if (!flag) {
          this.tag.laneNodeShow = false;
        } else {
          this.tag.laneNodeShow = true;
        }
      },
      getBrowserType() {
        let userAgent = navigator.userAgent;
        let isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
          return 1;
        }

        if (userAgent.indexOf("Firefox") > -1) {
          return 2;
        }
        if (userAgent.indexOf("Chrome") > -1) {
          return 3;
        }
        if (userAgent.indexOf("Safari") > -1) {
          return 4;
        }
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          alert('IE浏览器支持性较差，推荐使用Firefox或Chrome');
          return 5;
        }
        if (userAgent.indexOf("Trident") > -1) {
          alert('Edge浏览器支持性较差，推荐使用Firefox或Chrome');
          return 6;
        }
        ;
      },
      dealCompatibility() {
        const that = this;

        that.browserType = that.getBrowserType();
        if (that.browserType == 2) {
          flowConfig.shortcut.scaleContainer = {
            code: 16,
            codeName: 'SHIFT(chrome下为ALT)',
            shortcutName: '画布缩放',
          };
        }
      },
      initJsPlumb() {
        const that = this;

        that.plumb = jsPlumb.getInstance(flowConfig.jsPlumbInsConfig);

        that.plumb.bind('beforeDrop', function (info) {
          let sourceId = info.sourceId;
          let targetId = info.targetId;

          if (sourceId == targetId) return false;
          let filter = that.flowData.linkList.filter(link => (link.sourceId == sourceId && link.targetId == targetId));
          if (filter.length > 1) {
            that.$message.error('同方向的两节点连线只能有一条！');
            return false;
          }
          return true;
        });

        that.plumb.bind('connection', function (conn, e) {
          let connObj = conn.connection.canvas;
          let o = {}, id, label, condition;
          let bAdd = false;
          let l = that.flowData.linkList.find(link => (link.sourceId == conn.sourceId && link.targetId == conn.targetId))
          if (l == null || l.id == null) {
            id = 'link-' + ZFSN.getId();
            label = '';
            bAdd = true;
          } else {
            id = l.id;
            label = l.label;
          }

          connObj.id = id;
          o.type = 'link';
          o.id = id;
          o.data = "";
          o.sourceId = conn.sourceId;
          o.targetId = conn.targetId;
          o.label = label;


          o.cls = {
            linkType: flowConfig.jsPlumbInsConfig.Connector[0],
            linkColor: flowConfig.jsPlumbInsConfig.PaintStyle.stroke,
            linkThickness: flowConfig.jsPlumbInsConfig.PaintStyle.strokeWidth
          };
          $('#' + id).bind('contextmenu', function (e) {
            that.showLinkContextMenu(e);
            let filter = that.flowData.linkList.filter(l => l.id == id)
            if (filter.length == 1) {
              that.currentSelect = filter[0]
            } else {
              that.$message.error('当前节点异常！');
            }

          });
          $('#' + id).bind('click', function (e) {
            let event = window.event || e;
            event.stopPropagation();
            let filter = that.flowData.linkList.filter(l => l.id == id)
            if (filter.length == 1) {
              that.currentSelect = filter[0]
            } else {
              that.$message.error('当前节点异常！');


            }

          });
          console.debug("do bind action:" + bAdd);
          if (bAdd) that.flowData.linkList.push(o);
        });

        that.plumb.importDefaults({
          ConnectionsDetachable: flowConfig.jsPlumbConfig.conn.isDetachable
        });

        ZFSN.consoleLog(['实例化JsPlumb成功...']);
      },
      initNodeSelectArea() {
        $(document).ready(function () {
          $(".node-item").draggable({
            opacity: flowConfig.defaultStyle.dragOpacity,
            helper: 'clone',
            cursorAt: {
              top: 16,
              left: 60
            },
            containment: "window",
            revert: "invalid"
          });
          ZFSN.consoleLog(['初始化节点选择列表成功...']);
        });
      },
      listenShortcut() {
        const that = this;
        if (!this.focus) {
          document.onkeydown = null;
          document.onkeyup = null;
          return;
        }

        document.onkeydown = function (e) {
          let event = window.event || e;

          if (!that.activeShortcut) return;
          let key = event.keyCode;

          switch (key) {
            case flowConfig.shortcut.multiple.code:
              that.$refs.flowArea.rectangleMultiple.flag = true;
              break;
            case flowConfig.shortcut.dragContainer.code:
              that.$refs.flowArea.container.dragFlag = true;
              break;
            case flowConfig.shortcut.scaleContainer.code:
              that.$refs.flowArea.container.scaleFlag = true;
              break;
            case flowConfig.shortcut.dragTool.code:
              that.selectTool('drag');
              break;
            case flowConfig.shortcut.connTool.code:
              that.selectTool('connection');
              break;
            case flowConfig.shortcut.zoomInTool.code:
              that.selectTool('zoom-in');
              break;
            case flowConfig.shortcut.zoomOutTool.code:
              that.selectTool('zoom-out');
              break;
            case 37:
              that.moveNode('left');
              break;
            case 38:
              that.moveNode('up');
              break;
            case 39:
              that.moveNode('right');
              break;
            case 40:
              that.moveNode('down');
              break;
          }

          if (event.ctrlKey) {
            if (event.altKey) {
              switch (key) {
                case flowConfig.shortcut.settingModal.code:
                  that.setting();
                  break;
                case flowConfig.shortcut.testModal.code:
                  that.openTest();
                  break;
              }
            }
          }
        }
        document.onkeyup = function (e) {
          let event = window.event || e;

          let key = event.keyCode;
          if (key == flowConfig.shortcut.dragContainer.code) {
            that.$refs.flowArea.container.dragFlag = false;
          } else if (key == flowConfig.shortcut.scaleContainer.code) {
            event.preventDefault();
            that.$refs.flowArea.container.scaleFlag = false;
          } else if (key == flowConfig.shortcut.multiple.code) {
            that.$refs.flowArea.rectangleMultiple.flag = false;
          }
        }

        ZFSN.consoleLog(['初始化快捷键成功...']);
      },
      listenPage() {
        window.onbeforeunload = function (e) {
          e = e || window.event;
          if (e) {
            e.returnValue = '关闭提示';
          }
          return '关闭提示';
        };
      },
      initFlow() {
        const that = this;
        that.flowData.status = flowConfig.flowStatus.MODIFY
        if (that.flowData.status == flowConfig.flowStatus.CREATE) {
          that.flowData.attr.id = 'flow-' + ZFSN.getId();
        } else {
          that.loadFlowData();
        }
        ZFSN.consoleLog(['初始化流程图成功...']);
      },
      loadFlowData() {
        const that = this;
        let flowName = this.flowName;
        that.loading = true;
        that.clear();


        let model =
          {
            modelId: this.flowId,
            modelName: this.flowName,
            modelStatus: "released",
            modelAction:"inquireModelFirst"
          }
        axios.dealFlowModel(model).then(({data}) => {
            if (data.isSuccess) {
              this.$message.success(data.okMessage);

              if (data.modelData) {
                let loadData = data.modelData;
                that.flowData.attr = loadData.attr;
                that.flowData.config = loadData.config;
                that.flowData.status = flowConfig.flowStatus.LOADING;
                let nodeList = loadData.nodeList;
                nodeList.forEach(function (node, index) {
                  that.flowData.nodeList.push(node);
                });
                let linkList = loadData.linkList;
                linkList.forEach(function (link, index) {
                  that.flowData.linkList.push(link);
                })
                this.loadFlow()
              } else {
                that.flowData.status = flowConfig.flowStatus.CREATE
                that.flowData.attr.id = 'M' + ZFSN.getId();
                that.flowData.attr.name = flowName;
                that.flowData.attr.desc = '工作流模型';
                that.flowData.attr.version = '0.1';
                that.flowData.attr.status = 'released';
              }
            }
            that.loading = false;

          }
        ).catch(() => {
          this.$message.error('读取流程失败！');
          that.loading = false;
        })


      },
      flowContainer() {
        return 'contain' + ZFSN.getId();
      },

      loadFlow() {
        const that = this;

        //let loadData = JSON.parse(json);
        let nodeList = that.flowData.nodeList;

        let linkList = that.flowData.linkList;

        that.plumb.batch(function () {

          that.$nextTick(() => {
            linkList.forEach(function (link, index) {
              //that.flowData.linkList.push(link);
              let conn = that.plumb.connect({
                source: link.sourceId,
                target: link.targetId,
                anchor: flowConfig.jsPlumbConfig.anchor.default,
                connector: [
                  link.cls.linkType,
                  {
                    gap: 10,
                    cornerRadius: 8,
                    alwaysRespectStubs: true
                  }
                ],
                paintStyle: {
                  stroke: link.cls.linkColor,
                  strokeWidth: link.cls.linkThickness
                }
              });
              if (conn == null) {
                this.$message.error("创建连接有误")
              } else {
                let source = nodeList.find(node => (node.id == conn.sourceId));
                let target = nodeList.find(node => (node.id == conn.targetId));

                //link.label = source.nodeName + target.nodeName;
              }
              if (link.label != '') {
                conn.setLabel({
                  label: link.label,
                  cssClass: 'linkLabel'
                });
              }
            });
            that.currentSelect = {};
            that.currentSelectGroup = [];
            that.flowData.status = flowConfig.flowStatus.MODIFY;
          });
        }, true);
        let canvasSize = that.computeCanvasSize();
        that.$refs.flowArea.container.pos = {
          top: -canvasSize.minY + 100,
          left: -canvasSize.minX + 100
        }
      },
      findNodeConfig(belongto, type, callback) {
        let node = null;
        switch (belongto) {
          case 'commonNodes':
            node = commonNodes.filter(n => n.type == type);
            break;
          case 'highNodes':
            node = highNodes.filter(n => n.type == type);
            break;
          case 'laneNodes':
            node = laneNodes.filter(n => n.type == type);
            break;
        }
        if (node && node.length >= 0) node = node[0];
        callback(node);
      },
      selectTool(type) {
        let tool = tools.filter(t => t.type == type);
        if (tool && tool.length >= 0) this.currentTool = tool[0];

        switch (type) {
          case 'drag':
            this.changeToDrag();
            break;
          case 'connection':
            this.changeToConnection();
            break;
          case 'zoom-in':
            this.changeToZoomIn();
            break;
          case 'zoom-out':
            this.changeToZoomOut();
            break;
          case 'check':
            this.checkFlow();
            break;
        }
      },
      changeToDrag() {
        const that = this;

        that.flowData.nodeList.forEach(function (node, index) {
          let f = that.plumb.toggleDraggable(node.id);
          if (!f) {
            that.plumb.toggleDraggable(node.id);
          }
          if (node.type != 'x-lane' && node.type != 'y-lane') {
            that.plumb.unmakeSource(node.id);
            that.plumb.unmakeTarget(node.id);
          }
        });
      },
      changeToConnection() {
        const that = this;

        that.flowData.nodeList.forEach(function (node, index) {
          let f = that.plumb.toggleDraggable(node.id);
          if (f) {
            that.plumb.toggleDraggable(node.id);
          }
          if (node.type != 'x-lane' && node.type != 'y-lane') {
            that.plumb.makeSource(node.id, flowConfig.jsPlumbConfig.makeSourceConfig);
            that.plumb.makeTarget(node.id, flowConfig.jsPlumbConfig.makeTargetConfig);
          }
        });

        that.currentSelect = {};
        that.currentSelectGroup = [];
      },
      changeToZoomIn() {
        console.log('切换到放大工具');
      },
      changeToZoomOut() {
        console.log('切换到缩小工具');
      },
      checkFlow() {


        const that = this;
        let nodeList = that.flowData.nodeList;
        let linkList = that.flowData.linkList;


        that.linkinfo = "连接信息："
        that.linkinfo = that.linkinfo + linkList.length;

        that.nodeinfo = "节点信息："
        that.nodeinfo = that.nodeinfo + nodeList.length;
        that.errorMsg = ""
        linkList.forEach(function (conn, index) {
          let source = nodeList.find(node => (node.id == conn.sourceId));
          let target = nodeList.find(node => (node.id == conn.targetId));
          let label = ""
          if (source == null) {
            that.errorMsg = that.errorMsg + "连线没有找到source节点"
          } else
            label = source.nodeDesc + source.nodeName
          if (target == null) {
            that.errorMsg = that.errorMsg + "连线没有找到target节点"
          } else {
            label = label + target.nodeName + target.nodeDesc;
          }

          that.linkinfo = that.linkinfo + "__  " + label + "__  "
        });

        if (nodeList.length <= 0) {
          this.$message.error('流程图中无任何节点！');
          return false;
        }
        that.errorMsg = that.errorMsg + "========================节点错误 "
        for (let ii = 0; ii < nodeList.length; ii++) {
          let chekcNode = nodeList[ii];
          let nodeId = chekcNode.id;
          let filter0 = linkList.filter(link => (link.sourceId == nodeId || link.targetId == nodeId));
          let count0 = filter0.length;

          if (count0 == 0) {
            that.linkinfo = that.linkinfo + " " + chekcNode.nodeDesc + count0;
            that.errorMsg = that.errorMsg + chekcNode.nodeName + chekcNode.nodeDesc;
            that.$message.error('节点没有连接任何连线！');
            return false;
          }


        }
        that.errorMsg = that.errorMsg + "========================连线错误 "
        linkList.forEach(function (link, index) {
          let filter1 = nodeList.filter(node => (link.sourceId == node.id || link.targetId == node.id));

          if (filter1.length == 0) {
            that.errorMsg = that.errorMsg + link.label + link.data;
            that.$message.error('联线没有连接任何节点！');
            return false;
          }

          let filter2 = linkList.filter(link2 => ((link.sourceId == link2.sourceId) && (link.targetId == link2.targetId)));

          if (filter2.length > 1) {
            that.errorMsg = that.errorMsg + link.label + link.data;
            that.$message.error('连接同样两个节点超过一条连线！');
            return false;
          }

        });


        return true;

      },
      saveFlow() {
        const that = this;
        that.loading = true;
        let flowObj = Object.assign({}, that.flowData);

        if (!that.checkFlow()) {
          that.loading = false;
          return;
        }

        let d = JSON.stringify(flowObj);
        console.log(d);

        let filter = {
          modelId: {is: that.flowData.attr.id},
          //modelVersion: {is: that.flowData.attr.version}   目前暂时不考虑版本
        }
        let model = {
          modelId: that.flowData.attr.id,
          modelName: that.flowData.attr.name,
          modelDesc: that.flowData.attr.desc,
          modelVersion: that.flowData.attr.version,
          modelStatus: that.flowData.attr.status,
          modelData: that.flowData,
          modelAction: "saveModel",
          filter: filter,

        }
        axios.dealFlowModel(model).then(({data}) => {
          if (data.isSuccess) {
            this.$message.success('保存流程成功！');
            that.flowData.status = flowConfig.flowStatus.MODIFY
          }
          that.loading = false;
        }).catch(() => {
          this.$message.success('保存流程失败！');
          that.loading = false;
        })


        return d;
      },


      exportFlowPicture() {
        const that = this;

        if (!that.checkFlow()) return;

        let $Container = that.$refs.flowArea.$el.children[0],
          svgElems = $($Container).find('svg[id^="link-"]'),
          removeArr = [];

        svgElems.each(function (index, svgElem) {
          let linkCanvas = document.createElement('canvas');
          let canvasId = 'linkCanvas-' + ZFSN.getId();
          linkCanvas.id = canvasId;
          removeArr.push(canvasId);

          let svgContent = svgElem.outerHTML.trim();
          canvg(linkCanvas, svgContent);
          if (svgElem.style.position) {
            linkCanvas.style.position += svgElem.style.position;
            linkCanvas.style.left += svgElem.style.left;
            linkCanvas.style.top += svgElem.style.top;
          }
          $($Container).append(linkCanvas);
        });

        let canvasSize = that.computeCanvasSize();

        let pbd = flowConfig.defaultStyle.photoBlankDistance;
        let offsetPbd = ZFSN.div(pbd, 2);

        html2canvas($Container, {
          width: canvasSize.width + pbd,
          height: canvasSize.height + pbd,
          scrollX: -canvasSize.minX + offsetPbd,
          scrollY: -canvasSize.minY + offsetPbd,
          logging: false,
          onclone: function (args) {
            removeArr.forEach(function (id, index) {
              $('#' + id).remove();
            });
          }
        }).then(canvas => {
          let dataURL = canvas.toDataURL('image/png');
          that.flowPicture.url = dataURL;
          that.flowPicture.modalVisible = true;
        });
      },
      downLoadFlowPicture() {
        const that = this;
        let alink = document.createElement('a');
        let alinkId = 'alink-' + ZFSN.getId();
        alink.id = alinkId;
        alink.href = that.flowPicture.url;
        alink.download = '流程设计图_' + that.flowData.attr.id + '.png';
        alink.click();
      },
      cancelDownLoadFlowPicture() {
        this.flowPicture.url = '';
        this.flowPicture.modalVisible = false;
      },
      computeCanvasSize() {
        const that = this;
        let nodeList = Object.assign([], that.flowData.nodeList),
          minX = nodeList[0].x,
          minY = nodeList[0].y,
          maxX = nodeList[0].x + nodeList[0].width,
          maxY = nodeList[0].y + nodeList[0].height;
        nodeList.forEach(function (node, index) {
          minX = Math.min(minX, node.x);
          minY = Math.min(minY, node.y);
          maxX = Math.max(maxX, node.x + node.width);
          maxY = Math.max(maxY, node.y + node.height);
        });
        let canvasWidth = maxX - minX;
        let canvasHeight = maxY - minY;
        return {
          width: canvasWidth,
          height: canvasHeight,
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
      },
      flowdatachange(arr) {
        const that = this;
        let nodeList = that.flowData.nodeList
        let linkList = that.flowData.linkList

        this.checkFlow()

        arr.forEach(function (cell, index) {

          let inx1 = linkList.findIndex(link => (link.sourceId == cell.id || link.targetId == cell.id));

          while (inx1 >= 0) {

            let sourceId = linkList[inx1].sourceId;
            let targetId = linkList[inx1].targetId;
            let conns = that.plumb.getConnections({
              source: sourceId,
              target: targetId
            })
            that.plumb.deleteConnection(conns[0]);
            linkList.splice(inx1, 1);
            inx1 = linkList.findIndex(link => (link.sourceId == cell.id || link.targetId == cell.id));
          }
          let inx = nodeList.findIndex(node => node.id == cell.id);
          nodeList.splice(inx, 1);
          //that.plumb.remove(cell.id);


        })


        //this.loadFlow()

      },
      clear() {
        const that = this;
        // that.flowData.nodeList.forEach(function (node, index) {
        //   that.plumb.remove(node.id);
        // });
        let nodeList = that.flowData.nodeList
        let linkList = that.flowData.linkList
        linkList.forEach(function (link, index) {

          let sourceId = link.sourceId;
          let targetId = link.targetId;
          let conns = that.plumb.getConnections({
            source: sourceId,
            target: targetId
          })
          that.plumb.deleteConnection(conns[0]);

        })

        that.currentSelect = {};
        that.currentSelectGroup = [];
        that.flowData.nodeList = [];
        that.flowData.linkList = [];
        that.flowData.remarks = [];

      },
      toggleShowGrid() {
        let flag = this.flowData.config.showGrid;
        if (flag) {
          this.flowData.config.showGrid = false;
          this.flowData.config.showGridText = '显示网格';
          this.flowData.config.showGridIcon = 'eye-invisible';
        } else {
          this.flowData.config.showGrid = true;
          this.flowData.config.showGridText = '隐藏网格';
          this.flowData.config.showGridIcon = 'eye';
        }
      },
      setting() {
        this.$refs.settingModal.open();
      },
      shortcutHelper() {
        this.$refs.shortcutModal.open();
      },
      usingDoc() {
        window.open(this.info.gitee);
      },
      exit() {
        alert('退出流程设计器...');
      },
      showLinkContextMenu(e) {
        let event = window.event || e;

        event.preventDefault();
        event.stopPropagation();
        $('.vue-contextmenuName-flow-menu').css('display', 'none');
        $('.vue-contextmenuName-node-menu').css('display', 'none');
        let x = event.clientX;
        let y = event.clientY;
        this.linkContextMenuData.axis = {x, y};
      },
      deleteLink() {
        const that = this;
        let sourceId = that.currentSelect.sourceId;
        let targetId = that.currentSelect.targetId;
        let conns = that.plumb.getConnections({
          source: sourceId,
          target: targetId
        })
        that.plumb.deleteConnection(conns[0]);

        let linkList = that.flowData.linkList;
        let inx = linkList.findIndex(link => (link.sourceId == sourceId && link.targetId == targetId))
        if (inx >= 0)
          linkList.splice(inx, 1);
        that.currentSelect = {};

      },
      loseShortcut() {
        this.activeShortcut = false;
      },
      getShortcut() {
        this.activeShortcut = true;
      },
      openTest() {
        const that = this;

        let flowObj = Object.assign({}, that.flowData);
        that.$refs.testModal.flowData = flowObj;
        that.$refs.testModal.testVisible = true;
      },
      moveNode(type) {
        const that = this;

        let m = flowConfig.defaultStyle.movePx, isX = true;
        switch (type) {
          case 'left':
            m = -m;
            break;
          case 'up':
            m = -m;
            isX = false;
            break;
          case 'right':
            break;
          case 'down':
            isX = false;
        }

        if (that.currentSelectGroup.length > 0) {
          that.currentSelectGroup.forEach(function (node, index) {
            if (isX) {
              node.x += m;
            } else {
              node.y += m;
            }
          });
          that.plumb.repaintEverything();
        } else if (that.currentSelect.id) {
          if (isX) {
            that.currentSelect.x += m;
          } else {
            that.currentSelect.y += m;
          }
          that.plumb.repaintEverything();
        }
      }
    },
    watch: {}
  }
</script>

<style lang="scss">
  @import './style/flow-designer.scss';
</style>
