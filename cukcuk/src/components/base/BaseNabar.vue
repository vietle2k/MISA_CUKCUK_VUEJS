<template>
  <router-link class="navbar-item" tag="li" :to="{path: item.toLink}">
          <div class="navbar-icon" :class="item.classItem"></div>
          <div class="navbar-text">{{item.content}}</div>
  </router-link>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    
}
</script>

<style>

</style>