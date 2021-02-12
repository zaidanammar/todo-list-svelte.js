<script>
	// import { Router, Link, Route } from "svelte-routing";
	import RegisterPage from "./pages/RegisterPage.svelte";
	import LoginPage from "./pages/LoginPage.svelte";
	import HomePage from "./pages/HomePage.svelte";
	import { Router } from 'svelte-router-spa'
	import { routes } from './routes'
	// export let url = "";
</script>

<style>
	:global(body) {
		background-color: rgb(235, 231, 231);
		color: #1d3040;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}
</style>


<Router {routes}/>

<!-- <Router {url}>
	<div class="body">
		<Route path="/" component={RegisterPage} />
		<Route path="/login">
			<LoginPage />
		</Route>
		<Route path="/home" component={HomePage} />
	</div>
</Router> -->
