export default [{
    name: 'signIn',
    path: '/signIn',
    component: () =>
        import ( /* webpackChunkName: "signIn" */ './signIn.vue')
}, {
    name: 'demo',
    path: '/demo',
    component: () =>
        import ( /* webpackChunkName: "demo" */ './demo.vue')
}]