<template>
  <div class="page-editor">
    <slot name="handleEvents"></slot>
    <WestEditor
      :isSeparate="isSeparate"
      v-model:value="htmlString"
      :isBtn="isBtn"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import WestEditor from "@/base-ui/editor"

export default defineComponent({
  props: {
    isSeparate: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    isBtn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    WestEditor
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const htmlString = ref(props.modelValue)

    watch(htmlString, () => {
      emit("update:modelValue", htmlString)
    })

    return {
      htmlString
    }
  }
})
</script>

<style scoped lang="less">
.page-editor {
  background-color: #f0f2f5;
}
</style>
