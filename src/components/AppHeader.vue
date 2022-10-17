<template>
    <header class="p-2">
        <nav class="navbar">
            <div class="container-fluid">
                <a href="/"><img class="logo" src="img/logo.png" alt="worknal" /></a>
                <div class="dropdown text-end">
                    <img class="rounded-circle" src="../assets/img/avatar.png" alt="user" />
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
    width: 100%;
}

nav a:hover {
    opacity: 0.8;
}

nav .logo {
    height: 40px;
}

nav .rounded-circle {
    width: 40px;
    height: 40px;
    border: 2px solid rgb(40, 180, 100);
}
</style>
