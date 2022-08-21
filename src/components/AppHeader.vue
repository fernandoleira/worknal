<template>
    <header>
        <div class="container">
            <a>worknal</a>
            <div class="dropdown text-end">
                <img class="rounded-circle" src="../assets/img/avatar.png" alt="user" width="32" height="32" />
            </div>
        </div>
        <span>Hello Ferchu</span>
    </header>
</template>

<script>
export default {
  name: 'AppHeader',
  mounted() {
    console.log("Header has been mounted!");
  }
}
</script>

<style>
header {
    padding: 5px 5px;
}
</style>