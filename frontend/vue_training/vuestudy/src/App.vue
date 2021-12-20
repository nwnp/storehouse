<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/test-event">TestEvent</router-link> |
      <router-link to="/computed">Computed</router-link> |
      <router-link to="/test-condition">Condition</router-link> |
      <router-link to="/test-loop">Loop</router-link> |
      <router-link to="/test-mixin">Mixin</router-link> |
      <router-link to="/test-bootstrap">Bootstrap</router-link> |
      <router-link to="/test-comp">Component</router-link> |
      <router-link to="/test-family/props">Props</router-link> |
      <router-link to="/test-family/emit">Emit</router-link> |
      <router-link to="/test-family/event-bus">EventBus</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
