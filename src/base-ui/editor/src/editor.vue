<template>
  <div class="editor" :style="!isBtn ? { marginTop: '20px' } : {}">
    <template v-if="isSeparate">
      <div class="toolbar-container" ref="toolbarRef"></div>
    </template>
    <div class="text-container" ref="textRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"

import WangEditor from "wangeditor"

import type Editor from "wangeditor"

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ""
    },
    isSeparate: {
      type: Boolean,
      required: true
    },
    height: {
      type: Number,
      default: 500
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    isBtn: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    // 拿到Dom节点
    const toolbarRef = ref<HTMLDivElement>()
    const textRef = ref<HTMLDivElement>()

    // 保存Editor的实例
    const editorInstance = ref<Editor>()

    // 组件挂载完成后创建Editor
    onMounted(() => {
      // 调用创建Editor的回调
      createEditor()
    })

    // 创建Editor的函数
    const createEditor = () => {
      // 1.判断菜单和编辑区是否分离
      if (!props.isSeparate) {
        editorInstance.value = new WangEditor(textRef.value)
      } else {
        editorInstance.value = new WangEditor(toolbarRef.value, textRef.value)
      }

      // 2.调用Editor的配置函数
      setEditorConfig()

      // 3.创建Editor
      editorInstance.value.create()

      // 4.调用初始化函数
      initEditorContent(props.value)
    }

    // 设置Editor配置的函数
    const setEditorConfig = () => {
      if (!editorInstance.value) return

      // 配置Editor
      const editor = editorInstance.value
      // 设置编辑区域高度
      editor.config.height = props.height
      // 设置z-index
      editor.config.zIndex = props.zIndex
      // 设置监听
      editor.config.onchange = function (newHtml: string) {
        // 第二步，监控变化，同步更新到 textarea
        // console.log(newHtml) // 拿到html代码
        // console.log(editor.txt.text()) // 拿到文本
        emit("update:value", newHtml)
      }
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500 // 修改为 500ms
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "todo",
        "justify",
        "quote",
        "emoticon",
        "image",
        "video",
        "table",
        "code",
        "splitLine",
        "undo",
        "redo"
      ]
    }

    // 初始化Editor
    const initEditorContent = (htmlString: string) => {
      if (!editorInstance.value) return
      editorInstance.value.txt.html(htmlString)
    }

    return {
      toolbarRef,
      textRef
    }
  }
})
</script>

<style scoped lang="less">
.editor {
  background-color: #f0f2f5;

  .toolbar-container {
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .text-container {
    border: 1px solid #ccc;
    min-height: 400px;
    background-color: #ffffff;
    text-align: left;
  }
}
</style>
