<script>
	import { Router } from 'svelte-router-spa'
	import { routes } from './routes'
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
