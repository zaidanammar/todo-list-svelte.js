<script>
	import { Router, Link, Route } from "svelte-routing";
	import RegisterPage from "./pages/RegisterPage.svelte";
	import LoginPage from "./pages/LoginPage.svelte";
	import HomePage from "./pages/HomePage.svelte";
	export let url = "";
</script>

<Router {url}>
	<nav>
		<Link to="register">Register</Link>
		<Link to="login">Login</Link>
		<Link to="/">Home</Link>
	</nav>
	<div>
		<Route path="register" component={RegisterPage} />
		<Route path="login">
			<LoginPage />
		</Route>
		<Route path="/" component={HomePage} />
	</div>
</Router>
