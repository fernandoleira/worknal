<template>
    <header>
        <nav class="navbar">
            <div class="container-fluid">
                <a href="/">worknal</a>
                <div class="dropdown text-end">
                    <img class="rounded-circle" src="../assets/img/avatar.png" alt="user" width="32" height="32" />
                </div>
            </div>
        </nav>
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
nav {
    padding: 5px 5px;
    border-bottom: 2px solid #888;
}

nav a {
    color: black;
    text-decoration: none;
    font-size: 1.45em;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
}

nav a:hover {
    color: black;
    opacity: 0.6;
}
</style>
