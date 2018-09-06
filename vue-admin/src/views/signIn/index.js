export default [{
    name: 'signIn',
    path: '/signIn',
    component: () =>
        import ( /* webpackChunkName: "signIn" */ './signIn.vue')
}]