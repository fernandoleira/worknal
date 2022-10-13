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
}
</script>

<style>
nav {
    margin: 0px auto;
    width: 98%;
}

nav a {
    color: #222;
    text-decoration: none;
    font-family: 'Fredoka One', cursive;
    font-size: 1.5em;
    font-weight: bold;
}

nav a:hover {
    color: #222;
    opacity: 0.8;
}

nav img {
    border: 2px solid #222;
}
</style>
