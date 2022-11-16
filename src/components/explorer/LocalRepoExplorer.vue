<template>
  <div class="local-repo-explorer-view w-full px-2 box-border select-none">
    <ElInput size="small" :suffix-icon="Search" placeholder="Search For Repositories" v-model="searchText"
      ref="searchInputElement"></ElInput>
    <ElCollapseTransition>
      <div class="local-repo-pined-explorer mt-3" v-if="localRepositoryStore.pined.length > 0">
        <span class="extra-small-text light-color-text">Pined</span>
        <ElCollapseTransition>
          <ElTree :data="localRepositoryStore.pined" class="local-repo-pined-tree"
            @node-contextmenu="showPinedContextMenu">
          </ElTree>
        </ElCollapseTransition>
      </div>
    </ElCollapseTransition>
    <div class="local-repo-main-explorer mt-3">
      <div class="local-repo-main-explorer-header flex w-full items-center justify-between">
        <span class="extra-small-text light-color-text">Repositories</span>
        <div class="local-repo-main-explorer-header-actions">
          <ElTooltip content="Clear All Invalid Repositories" :show-after="1000">
            <ElIcon>
              <Delete class="extra-small-text light-color-text" @click="deleteAllInvalidRepositories" />
            </ElIcon>
          </ElTooltip>
          <ElTooltip content="Sort" :show-after="1000">
            <ElIcon>
              <Sort class="extra-small-text light-color-text" @click="showSortContextMenu" />
            </ElIcon>
          </ElTooltip>
        </div>
      </div>
      <ElTree :data="localRepositoryStore.localRepositoriesTreeData" class="local-repo-main-tree"
        @node-contextmenu="showContextMenu"></ElTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Sort, Delete } from '@element-plus/icons-vue';
import { ref, onMounted, onUnmounted } from 'vue';
import Mousetrap from "mousetrap"
import { useLocalRepositoryStore } from "../../store/localRepository"
import { ElInput, ElCollapseTransition, ElTree, ElIcon } from 'element-plus';
import contextMenuCallbackEventListener from '../../utils/contextMenuCallback';

const localRepositoryStore = useLocalRepositoryStore()

const searchInputElement = ref()

const focusSearchInput = () => searchInputElement.value.focus()

onMounted(() => {
  Mousetrap.bind("command+f", focusSearchInput)
})

onUnmounted(() => {
  Mousetrap.unbind("command+f")
})

const searchText = ref("")
const repositoryItemContextMenuTemplate = [{
  label: "pin"
}]

const repositoryGroupItemContextMenuTemplate = [{ label: "group" }]

const pinedRepositoryItemContextMenuTemplate = [{ label: "unpin" }]
const showContextMenu = (event: PointerEvent, node: any) => {
  common_bridge.showContextMenu(node.children ? repositoryGroupItemContextMenuTemplate : repositoryItemContextMenuTemplate, event.clientX, event.clientY)
}

const showSortContextMenu = (event: PointerEvent) => {
  common_bridge.showContextMenu([{
    id: "local-repo-explorer-sort-name",
    label: "Sort By Name",
    type: "radio",
    checked: localRepositoryStore.explorerSort === 'name'
  }, {
    id: "local-repo-explorer-sort-type",
    label: "Sort By Type",
    type: "radio",
    checked: localRepositoryStore.explorerSort === 'type'
  }], event.clientX, event.clientY)
}

const showPinedContextMenu = (event: PointerEvent, node: any) => {
  common_bridge.showContextMenu(pinedRepositoryItemContextMenuTemplate, event.clientX, event.clientY)
}

const deleteAllInvalidRepositories = async () => {
  const { response } = await common_bridge.confirm("Confirm", "Delete All Invalid Repositories ?", "This action only removes the repository from the fog and does not modify the local files")
  response === 0 && localRepositoryStore.deleteAllInvalidRepositories()
}

const sortByName = () => localRepositoryStore.sortByName()
const sortByType = () => localRepositoryStore.sortByType()

onMounted(() => {
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-sort-name", sortByName)
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-sort-type", sortByType)
})

</script>

<style scoped>
.local-repo-explorer-view {
  height: 88%;
}
</style>