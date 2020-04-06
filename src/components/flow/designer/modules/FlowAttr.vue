<template>
  <div>

    <a-tabs size="small" defaultActiveKey="flow-attr" :activeKey="activeKey">
      <a-tab-pane key="flow-attr">
				<span slot="tab">
					<a-icon type="cluster"/>
					流程属性
				</span>
        <a-form layout="horizontal">
          <a-form-item label="流程id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="flowData.attr.id" disabled/>
          </a-form-item>
          <a-form-item label="流程名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-model="flowData.attr.name"/>
          </a-form-item>
          <a-form-item label="流程描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-model="flowData.attr.desc"/>
          </a-form-item>
          <a-form-item label="流程版本" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input v-model="flowData.attr.version"/>
          </a-form-item>
          <a-form-item label="状态" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input disabled v-model="flowData.attr.status"/>
          </a-form-item>
          <a-form-item label="业务字段" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input  v-model="flowData.bizFields"/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="node-attr">
				<span slot="tab">
					<a-icon type="profile"/>
					节点属性
				</span>
        <template v-if="currentSelect.type == 'start'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>

          </a-form>
        </template>
        <template v-if="currentSelect.type == 'end'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>

          </a-form>
        </template>
        <template v-if="currentSelect.type == 'common'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" :value="currentSelect.nodeDesc" @change="nodeDescChange"/>
            </a-form-item>
            <a-form-item label="创建方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入创建方法" v-model="currentSelect.createMethod"/>
            </a-form-item>
            <a-form-item label="参照节点" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入参照节点" v-model="currentSelect.referNode"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-if="currentSelect.type == 'commons'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" :value="currentSelect.nodeDesc" @change="nodeDescChange"/>
            </a-form-item>
            <a-form-item label="创建方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入创建方法" v-model="currentSelect.createMethod"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-if="currentSelect.type == 'option'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" :value="currentSelect.nodeDesc" @change="nodeDescChange"/>
            </a-form-item>
          </a-form>
        </template>

        <template v-else-if="currentSelect.type == 'auto'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
            <a-form-item label="创建方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入创建方法" v-model="currentSelect.createMethod"/>
            </a-form-item>
            <a-form-item label="执行方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入执行方法" v-model="currentSelect.dealMethod"/>
            </a-form-item>
            <a-form-item label="延迟时间" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入延迟时间（<60秒）" v-model="currentSelect.delay"/>
            </a-form-item>
            <a-form-item label="间隔时间" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入间隔时间（秒）" v-model="currentSelect.interval"/>
            </a-form-item>
            <a-form-item label="执行次数" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入执行次数" v-model="currentSelect.runCount"/>
            </a-form-item>
            <a-form-item label="运行时长" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入运行时间（秒）" v-model="currentSelect.runTime"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="currentSelect.type == 'threads'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
            <a-form-item label="创建方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入创建方法" v-model="currentSelect.createMethod"/>
            </a-form-item>
            <a-form-item label="执行方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入执行方法" v-model="currentSelect.dealMethod"/>
            </a-form-item>
            <a-form-item label="延迟时间" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入延迟时间（<60秒）" v-model="currentSelect.delay"/>
            </a-form-item>
            <a-form-item label="间隔时间" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入间隔时间（秒）" v-model="currentSelect.interval"/>
            </a-form-item>
            <a-form-item label="执行次数" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入执行次数" v-model="currentSelect.runCount"/>
            </a-form-item>
            <a-form-item label="运行时长" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入运行时间（秒）" v-model="currentSelect.runTime"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="currentSelect.type == 'notice'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
            <a-form-item label="创建方法" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入创建方法" v-model="currentSelect.createMethod"/>
            </a-form-item>

          </a-form>
        </template>
        <template v-else-if="currentSelect.type == 'event'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
            <a-form-item label="触发字段" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入触发字段" v-model="currentSelect.eventFields"/>
            </a-form-item>



          </a-form>
        </template>

        <template v-else-if="currentSelect.type == 'gateway'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
          </a-form>
        </template>

        <template v-else-if="currentSelect.type == 'ingate'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
            <a-form-item label="通过依据" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input placeholder="请输入数字或百分比" v-model="currentSelect.pass"/>
          </a-form-item>
            <a-form-item label="判断脚本" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入脚本" v-model="currentSelect.script"/>
            </a-form-item>
            <a-form-item label="后台判断" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入后台判断方法" v-model="currentSelect.method"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="currentSelect.type == 'outgate'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
            <a-form-item label="强制结束节点" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入强制结束节点" v-model="currentSelect.quit"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="currentSelect.type == 'childflow'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="currentSelect.type == 'x-lane' || currentSelect.type == 'y-lane'">
          <a-form layout="horizontal">
            <a-form-item label="类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-tag color="purple">{{ currentSelect.type }}</a-tag>
            </a-form-item>
            <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input :value="currentSelect.id" disabled/>
            </a-form-item>
            <a-form-item label="节点名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点名称" :value="currentSelect.nodeName" @change="nodeNameChange"/>
            </a-form-item>
            <a-form-item label="节点描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入节点描述" v-model="currentSelect.nodeDesc"/>
            </a-form-item>
          </a-form>
        </template>
      </a-tab-pane>
      <a-tab-pane key="link-attr">
				<span slot="tab">
					<a-icon type="branches"/>
					连线属性
				</span>
        <a-form layout="horizontal">
          <a-form-item label="id" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="currentSelect.id" disabled/>
          </a-form-item>
          <a-form-item label="源节点" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="currentSelect.sourceId" disabled/>
          </a-form-item>
          <a-form-item label="目标节点" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="currentSelect.targetId" disabled/>
          </a-form-item>
          <a-form-item label="文本" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="currentSelect.label" @change="linkLabelChange"/>
          </a-form-item>
          <a-form-item label="条件" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-input :value="currentSelect.data" @change="linkDataChange"/>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
  import jsplumb from 'jsplumb'
  import {flowConfig} from '../config/args-config.js'

  export default {
    props: ['plumb', 'flowData', 'select'],
    components: {
      jsplumb
    },
    data() {
      return {
        currentSelect: this.select,
        formItemLayout: {
          labelCol: {span: 6},
          wrapperCol: {span: 16}
        },
        activeKey: 'flow-attr'
      }
    },
    methods: {
      nodeNameChange(e) {
        this.currentSelect.nodeName = e.target.value;
      },
      nodeDescChange(e) {
        this.currentSelect.nodeDesc = e.target.value;
      },
      linkDataChange(e) {
        this.currentSelect.data = e.target.value;
        console.debug(this.currentSelect)
      },
      linkLabelChange(e) {
        const that = this;
        let label = e.target.value;

        that.currentSelect.label = label;
        let conn = that.plumb.getConnections({
          source: that.currentSelect.sourceId,
          target: that.currentSelect.targetId
        })[0];
        if (label != '') {
          conn.setLabel({
            label: label,
            cssClass: 'linkLabel'
          });
        } else {
          let labelOverlay = conn.getLabelOverlay();
          if (labelOverlay) conn.removeOverlay(labelOverlay.id);
        }
      }
    },
    watch: {
      select(val) {
        this.currentSelect = val;
        if (this.currentSelect.type == 'link') {
          this.activeKey = 'link-attr';
        } else if (!this.currentSelect.type) {
          this.activeKey = 'flow-attr';
        } else {
          this.activeKey = 'node-attr';
        }
      },
      currentSelect: {
        handler(val) {
          this.$emit('update:select', val);
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  @import '../style/flow-attr.scss'
</style>
