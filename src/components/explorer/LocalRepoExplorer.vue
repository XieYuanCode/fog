<template>
  <div class="local-repo-explorer-view w-full px-2 box-border select-none">
    <ElInput size="small" :suffix-icon="Search" placeholder="Search For Repositories" v-model="searchText"
      ref="searchInputElement"></ElInput>
    <ElCollapseTransition>
      <div class="local-repo-pined-explorer mt-3">
        <span class="extra-small-text light-color-text">Pined</span>
        <ElCollapseTransition>
          <ElTree :data="pinedTreeData" class="local-repo-pined-tree" @node-contextmenu="showContextMenu"></ElTree>
        </ElCollapseTransition>
      </div>
    </ElCollapseTransition>
    <div class="local-repo-main-explorer mt-3">
      <span class="extra-small-text light-color-text">Repositories</span>
      <ElTree :data="repoTreeData" class="local-repo-main-tree"></ElTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import Mousetrap from "mousetrap"

const searchInputElement = ref()

const focusSearchInput = () => searchInputElement.value.focus()

onMounted(() => {
  Mousetrap.bind("command+p", focusSearchInput)
})

onUnmounted(() => {
  Mousetrap.unbind("command+p")
})

const pinedTreeData = reactive([{ label: "1" }])
const repoTreeData = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  }
];


const searchText = ref("")
const showContextMenu = (_: PointerEvent, node) => {
  console.log(node.label);
}
</script>

<style scoped>
.local-repo-explorer-view {
  height: 88%;
}
</style>