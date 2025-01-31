<template>
  <!-- Main entry component -->
  <UserForm />
</template>

<script>
import UserForm from './views/UserForm.vue';
// OR import UserForm from '@/views/UserForm.vue'; if using alias

export default {
  name: 'App',
  components: { UserForm }
};
</script>

<style>
/* Global styles could remain here or move to global CSS */
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  background-color: #f0f0f0;
}
</style>
