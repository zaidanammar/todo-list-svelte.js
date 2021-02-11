<script>
	import { Router, Link, Route } from "svelte-routing";
	import RegisterPage from "./pages/RegisterPage.svelte";
	import LoginPage from "./pages/LoginPage.svelte";
	import HomePage from "./pages/HomePage.svelte";
	import Navbar from "./components/Navbar.svelte";
	export let url = "";
</script>

<style>
	:global(body) {
		background-color: papayawhip;
		color: #0084f6;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>

<Router {url}>
	<!-- <nav>
		<Link to="register">Register</Link>
		<Link to="login">Login</Link>
		<Link to="/">Home</Link>
	</nav> -->
	<!-- <Navbar/> -->
	<div class="body">
		<Route path="/register" component={RegisterPage} />
		<Route path="/login">
			<LoginPage />
		</Route>
		<Route path="/" component={HomePage} />
	</div>
</Router>
