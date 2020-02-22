export default async function ({ store, redirect }) {
  // If the user is not authenticated
  if (!window.localStorage.getItem('token')) {
    return redirect('/login')
  } else {
    await store.dispatch('auth/GET_ME')
  }
}
