import Vue from "vue";
import Router from "vue-router";
import HomeWeather from "@/views/HomeWeather";
import Favorites from "@/views/Favorites";
import About from "@/views/About";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: { name: "weather" } },
    {
      path: "/weather/:key?",
      name: "weather",
      component: HomeWeather
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
