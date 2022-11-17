<template>
  <div class="local-repo-explorer-view w-full px-2 box-border select-none">
    <ElInput size="small" :suffix-icon="Search" placeholder="Search For Repositories" v-model="searchText"
      ref="searchInputElement"></ElInput>
    <ElCollapseTransition>
      <div class="local-repo-pined-explorer mt-3" v-if="localRepositoryStore.pined.length > 0">
        <span class="extra-small-text light-color-text">Pined</span>
        <ElTree :data="localRepositoryStore.pined" class="local-repo-pined-tree"
          @node-contextmenu="showPinedContextMenu">
          <template #default="{ node, data }">
            <div class="local-repo-tree-custom-content-pined flex justify-between items-center">
              <div class="local-repo-tree-custom-content-pined-prefix flex justify-start items-center">
                <ElIcon color="var(--el-color-primary)">
                  <CollectionTag />
                </ElIcon>
                <ElIcon class="mr-2" color="var(--el-color-primary)">
                  <Folder />
                </ElIcon>
                <span>{{ node.label }}</span>
              </div>
            </div>
          </template>
        </ElTree>
      </div>
    </ElCollapseTransition>
    <div class="local-repo-main-explorer mt-3">
      <div class="local-repo-main-explorer-header flex w-full items-center justify-between">
        <span class="extra-small-text light-color-text">Repositories</span>
        <div class="local-repo-main-explorer-header-actions">
          <!-- <ElTooltip content="Clear All Invalid Repositories" :show-after="1000"> -->
          <ElIcon>
            <Delete class="extra-small-text light-color-text" @click="deleteAllInvalidRepositories" />
          </ElIcon>
          <!-- </ElTooltip> -->
          <!-- <ElTooltip content="Sort" :show-after="1000"> -->
          <ElIcon>
            <Sort class="extra-small-text light-color-text" @click="showSortContextMenu" />
          </ElIcon>
          <!-- </ElTooltip> -->
        </div>
      </div>
      <ElTree :data="localRepositoryStore.localRepositoriesTreeData" class="local-repo-main-tree"
        @node-contextmenu="showContextMenu">
        <template #default="{ node, data }">
          <div class="local-repo-tree-custom-content flex justify-between items-center">
            <div class="local-repo-tree-custom-content-prefix flex justify-start items-center">
              <ElIcon class="mr-2" color="var(--el-color-primary)">
                <Folder v-if="data.type === 'repo'" />
                <TakeawayBox v-if="data.type === 'group' && data.source.type === 'normal'" />
                <AttachedTreeItemIcon v-if="data.type === 'group' && data.source.type === 'attach'" />
              </ElIcon>
              <span>{{ data.label }}</span>
            </div>
          </div>
        </template>
      </ElTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Sort, Delete, Folder, TakeawayBox, CollectionTag } from '@element-plus/icons-vue';
import { ref, onMounted, onUnmounted } from 'vue';
import Mousetrap from "mousetrap"
import { useLocalRepositoryStore } from "../../store/localRepository"
import { ElInput, ElCollapseTransition, ElTree, ElIcon } from 'element-plus';
import contextMenuCallbackEventListener from '../../utils/contextMenuCallback';
import { isMac } from '../../utils/system';
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ITreeItem } from '../../types/tree';
import AttachedTreeItemIcon from "../icons/AttachedTreeItemIcon.vue"


const localRepositoryStore = useLocalRepositoryStore()

const searchInputElement = ref()

const focusSearchInput = () => searchInputElement.value.focus()

onMounted(() => {
  Mousetrap.bind("command+p", focusSearchInput)
})

onUnmounted(() => {
  Mousetrap.unbind("command+p")
})

const searchText = ref("")

// const treeRenderContent = (h, { node, data, store }: { node: Node, data: ITreeItem<any>, store: Node['store'] }) => {
//   return h('div', { class: "tree-repo-item" }, [h('ElIcon', null, h(data.type === 'repo' ? 'Folder' : 'TakeawayBox')), '123'])
// }

const showContextMenu = (event: PointerEvent, node: any) => {
  console.log(node);
  const repositoryItemContextMenuTemplate = [{
    id: node.source.pined ? `local-repo-explorer-unpin_${node.source.id}` : `local-repo-explorer-pin_${node.source.id}`,
    label: node.source.pined ? "Unpin" : "Pin"
  }, {
    type: "separator"
  }, {
    id: `local-repo-explorer-open_${node.source.id}`,
    label: "Open"
  }, {
    id: `local-repo-explorer-open-new-window_${node.source.id}`,
    label: "Open In New Window"
  }, {
    type: "separator"
  }, {
    id: `local-repo-explorer-reveal-in-finder_${node.source.id}`,
    label: isMac() ? "Reveal in Finder" : "Open in Explore",
    accelerator: "CommandOrControl+Shift+R"
  }, {
    id: `local-repo-explorer-open-in-terminal_${node.source.id}`,
    label: "Open in Terminal",
    accelerator: "CommandOrControl+Shift+T"
  }, {
    id: `local-repo-explorer-open-in-editor_${node.source.id}`,
    label: "Open in Editor",
    accelerator: "CommandOrControl+Shift+E"
  }, {
    type: "separator"
  }, {
    id: `local-repo-explorer-rename_${node.source.id}`,
    label: "Rename",
    accelerator: isMac() ? "Enter" : "CommandOrControl+R"
  }, {
    id: `local-repo-explorer-delete_${node.source.id}`,
    label: "Delete",
    accelerator: "CommandOrControl+Delete"
  }, {
    id: `local-repo-explorer-delete_files_${node.source.id}`,
    label: "Delete Files",
    accelerator: "CommandOrControl+Shift+Delete"
  }]

  const repositoryGroupItemContextMenuTemplate = [{ label: "group" }]

  common_bridge.showContextMenu(node.type === "group" ? repositoryGroupItemContextMenuTemplate : repositoryItemContextMenuTemplate, event.clientX, event.clientY)
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
  const pinedRepositoryItemContextMenuTemplate = [{
    id: `local-repo-explorer-unpin_${node.source.id}`,
    label: "Unpin"
  }, {
    type: "separator"
  }, {
    id: `local-repo-explorer-open_${node.source.id}`,
    label: "Open"
  }, {
    id: `local-repo-explorer-open-new-window_${node.source.id}`,
    label: "Open In New Window"
  }, {
    type: "separator"
  }, {
    id: `local-repo-explorer-reveal-in-finder_${node.source.id}`,
    label: isMac() ? "Reveal in Finder" : "Open in Explore",
    accelerator: "CommandOrControl+Shift+R"
  }, {
    id: `local-repo-explorer-open-in-terminal_${node.source.id}`,
    label: "Open in Terminal",
    accelerator: "CommandOrControl+Shift+T"
  }, {
    id: `local-repo-explorer-open-in-editor_${node.source.id}`,
    label: "Open in Editor",
    accelerator: "CommandOrControl+Shift+E"
  }, {
    type: "separator"
  }, {
    id: `local-repo-explorer-rename_${node.source.id}`,
    label: "Rename",
    accelerator: isMac() ? "Enter" : "CommandOrControl+R"
  }, {
    id: `local-repo-explorer-delete_${node.source.id}`,
    label: "Delete",
    accelerator: "CommandOrControl+Delete"
  }, {
    id: `local-repo-explorer-delete_files_${node.source.id}`,
    label: "Delete Files",
    accelerator: "CommandOrControl+Shift+Delete"
  }]

  common_bridge.showContextMenu(pinedRepositoryItemContextMenuTemplate, event.clientX, event.clientY)
}

const deleteAllInvalidRepositories = async () => {
  const { response } = await common_bridge.confirm("Confirm", "Delete All Invalid Repositories ?", "This action only removes the repository from the fog and does not modify the local files")
  response === 0 && localRepositoryStore.deleteAllInvalidRepositories()
}

const sortByName = () => localRepositoryStore.sortByName()
const sortByType = () => localRepositoryStore.sortByType()
const pinRepo = (event: any) => {
  const repoID = event.detail.split("_")[1]
  if (!repoID) return
  localRepositoryStore.pinRepo(repoID)
}

const unpinRepo = (event: any) => {
  const repoID = event.detail.split("_")[1]
  if (!repoID) return
  localRepositoryStore.unPinRepo(repoID)
}

onMounted(() => {
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-sort-name", sortByName)
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-sort-type", sortByType)
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-pin", pinRepo)
  contextMenuCallbackEventListener.addEventListener("local-repo-explorer-unpin", unpinRepo)
})

</script>

<style scoped>
.local-repo-explorer-view {
  height: 88%;
}
</style>