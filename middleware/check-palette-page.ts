export default defineNuxtRouteMiddleware((to, from) => {
  const palette = to.query.palette
  if (!palette) {
    return navigateTo('/')
  }
})
