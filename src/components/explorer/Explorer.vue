<template>
  <div class="explorer-view w-full">
    <FogTree blockNode :data="treeData" size="mini" class="explorer-tree select-none" />
  </div>
</template>

<script setup lang="ts">

const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Leaf',
            key: '0-0-0-0',
          },
          {
            title: 'Leaf',
            key: '0-0-0-1',
          }
        ]
      },
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf',
            key: '0-0-1-0',
          },
        ]
      },
    ],
  },
];

</script>

<style scoped>
</style>