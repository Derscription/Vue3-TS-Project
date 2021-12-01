<template>
  <div class="chat">
    <PageEditor
      :isSeparate="true"
      :modelValue="htmlString"
      @update:modelValue="handleModelValue"
      :isBtn="isBtn"
    >
      <template #handleEvents v-if="isBtn">
        <div class="handleEventsBtn">
          <el-button type="primary" @click="handleBtnClick">提交</el-button>
        </div>
      </template>
    </PageEditor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import type { Ref } from "vue"

import PageEditor from "@/components/page-editor"

export default defineComponent({
  name: "chat",
  components: {
    PageEditor
  },
  setup() {
    const htmlString = ref("Code")
    const isBtn = ref(true)

    const handleModelValue = (html: Ref<string>) => {
      htmlString.value = html.value
    }

    const handleBtnClick = () => {
      console.log(htmlString.value)
    }

    return {
      htmlString,
      isBtn,
      handleModelValue,
      handleBtnClick
    }
  }
})
</script>

<style scoped lang="less">
.chat {
  .handleEventsBtn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
