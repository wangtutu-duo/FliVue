<template>
	<div>


	</div>
</template>

<script>
	import jsplumb from 'jsplumb'
	import { flowConfig } from '../config/args-config.js'
	
	export default {
	  name:"FlowFields",
		props: ['plumb', 'flowData', 'select'],
		components: {
			jsplumb
		},
		data () {
			return {
				currentSelect: this.select,
				formItemLayout: {
					labelCol: { span: 6 },
					wrapperCol: { span: 16 }
				},
				activeKey: 'flow-attr'
			}
		},
		methods: {
			nodeNameChange (e) {
				this.currentSelect.nodeName = e.target.value;
			},
      nodeDescChange(e) {
        this.currentSelect.nodeDesc = e.target.value;
      },
      linkDataChange(e)
      {
        this.currentSelect.data = e.target.value;
        console.debug(this.currentSelect)
      },
			linkLabelChange (e) {
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
			select (val) {
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
				handler (val) {
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
