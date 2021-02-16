import LoginPage from './pages/LoginPage.svelte'
import HomePage from './pages/Homepage.svelte'
import RegisterPage from './pages/RegisterPage.svelte'

function isLoggedin() {
  //check if user is admin and returns true or false
  if (localStorage.getItem('access_token')) {
    return true
  } else {
    return false
  }
}

const routes = [
  {
    name: '/login',
    component: LoginPage,
  },
  { name: '/register', component: RegisterPage },
  {
    name: '/',
    component: HomePage,
    onlyIf: { guard: isLoggedin, redirect: '/login' },
  },
]

export { routes }