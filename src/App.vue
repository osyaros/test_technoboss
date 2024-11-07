<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@coreui/coreui/dist/css/coreui.min.css'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/part1">Part1</RouterLink>
        <RouterLink to="/part2">Part2</RouterLink>
        <RouterLink to="/part3">Part3</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
<style scoped>

</style>

