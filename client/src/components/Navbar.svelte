<script>
  import { navigate } from "svelte-routing";

  let darkMode = false;

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleDarkMode = () => {
    darkMode = !darkMode
    window.document.body.classList.toggle("dark-mode");
  };
</script>

<style>
  :global(body.dark-mode) button {
    background-color: #0084f6;
    color: white;
  }
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a class="navbar-brand" href="#">Todo App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
      </ul>
      {#if darkMode}
      <button class="btn btn-outline-danger" on:click={handleDarkMode}>Light Mode</button>
      {:else}
      <button class="btn btn-outline-danger" on:click={handleDarkMode}>Dark Mode</button>
      {/if}
      <form class="d-flex">
        <button
          class="btn btn-outline-danger"
          type="submit"
          on:click={logout}>Logout</button>
      </form>
    </div>
  </div>
</nav>
