<template>
<div id="app">
    <router-view />
</div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@200&display=swap');
#app {
    font-family: 'Kanit', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
body {
    font-family: 'Kanit', sans-serif;
    background: #4261cf;
    background: -moz-linear-gradient(45deg, #3023ae 0%, #53a0fd 100%);
    background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, #3023ae), color-stop(100%, #53a0fd));
    background: -webkit-linear-gradient(45deg, #3023ae 0%, #53a0fd 100%);
    background: -o-linear-gradient(45deg, #3023ae 0%, #53a0fd 100%);
    background: -ms-linear-gradient(45deg, #3023ae 0%, #53a0fd 100%);
    background: linear-gradient(45deg, #3023ae 0%, #53a0fd 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$gradient-start', endColorstr='$gradient-end', GradientType=1);
    color: white;
    width: 100vw;
    height: 100vh;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
