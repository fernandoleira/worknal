<template>
    <header class="p-2">
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
    margin: 0px auto;
    width: 98%;
    border-bottom: 2px solid #222;
}

nav a {
    color: #222;
    text-decoration: none;
    font-size: 1.45em;
    font-weight: bold;
}

nav a:hover {
    color: #fff;
    opacity: 0.8;
}

nav img {
    border: 2px solid #222;
}
</style>
