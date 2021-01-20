<template>
  <div class="about">
    <div class="backgroud">
      <div class="text">
        <h4>Hi, I'm Assaf</h4>
        <p>
          I'm a Web developer who enjoys creating web applications with HTML,
          CSS, JavaScript, Vue JS, Angular and Node JS.
        </p>
        <p>
          this is a simple weather application using vueJs, vuex and vue router.
        </p>
        <div class="icon-links">
          <p>
            <a style="color: #fff" href="https://github.com/sggv950"
              ><font-awesome-icon :icon="['fab', 'github']" size="lg"
            /></a>
          </p>
          <p>
            <a
              style="color: #fff"
              href="https://www.linkedin.com/in/assaf-segev-96a848102"
              ><font-awesome-icon :icon="['fab', 'linkedin']" size="lg"
            /></a>
          </p>
          <p>
            <a
              style="color: #fff"
              href="https://github.com/sggv950/vue-weather-app"
              ><font-awesome-icon :icon="['fas', 'code-branch']" size="lg"
            /></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backgroud {
  width: 100vw;
  height: 100vh;
  text-align: start;
  background-color: rgba(0, 0, 0, 0.7);
}

.text {
  padding-top: 40px;
  padding-left: 40px;
  color: white;
}

.icon-links {
  display: flex;

  p:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
