import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _52d4c43d = () => interopDefault(import('../../src/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _a7ec4fe8 = () => interopDefault(import('../../src/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2d0f2fc6 = () => interopDefault(import('../../src/pages/secret.vue' /* webpackChunkName: "pages/secret" */))
const _3b3b9616 = () => interopDefault(import('../../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _52d4c43d,
    name: "inspire"
  }, {
    path: "/login",
    component: _a7ec4fe8,
    name: "login"
  }, {
    path: "/secret",
    component: _2d0f2fc6,
    name: "secret"
  }, {
    path: "/",
    component: _3b3b9616,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
