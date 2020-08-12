<template>
  <div id="app">
    <header>
      <span id="logo">Weather in Vue</span>
      <nav>
        <router-link to="/home">Home</router-link>
      </nav>
    </header>
    <main class="container">
      <router-view />
    </main>
    <footer>
      <p>
        Created with ❤️ by
        <a href="https://www.josephbartley.dev">
          Joseph Bartley
        </a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const app = Vue.extend({
  name: "App",
  metaInfo() {
    return {
      title: "Weather in Vue",
      meta: [
        {
          name: "description",
          content: "Get your current local weather today."
        }
      ]
    };
  }
});

export default app;
</script>

<style lang="scss">
@import "./styles/normalize.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: content-box;
}

header,
footer {
  background: #42b983;
  display: flex;
  height: 50px;
  justify-content: space-between;

  #logo {
    color: white;
    font-size: 26px;
    font-weight: bold;
    line-height: 50px;
    padding: 0 10px;
  }

  nav {
    a {
      font-weight: bold;
      color: #2c3e50;
      line-height: 50px;
      padding: 0 10px;
      text-decoration: none;

      &.router-link-exact-active {
        color: white;
      }
    }
  }

  p {
    color: white;
    text-align: center;
    width: 100%;

    a {
      color: white;
    }
  }
}

main {
  background-color: #2c3e50;
  height: calc(100vh - 132px);
  padding: 16px;
}
</style>
