<script>
    let pageName = "Register Page";
    let user = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
    };
    $: matchPassword = false

    const handleRegister = () => {
        console.log(user)
    }
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* background-color: darkslategray; */
    }

    .input {
        width: 60%;
    }
</style>

<main>
    <h1>{pageName}!</h1>
    <p>Welcome this is my <b>{pageName}</b></p>

    <form on:submit={handleRegister}>
        <div class='form'>
            <input type="text" class="input" placeholder="Input your name here!" bind:value={user.name}/>
            <input type="email" class="input" placeholder="Input your email here!" bind:value={user.email}/>
            <input type="password" class="input" placeholder="Input your password here!" bind:value={user.password} />
            <input type="password" class="input" placeholder="Re-enter your password here!" bind:value={user.rePassword} />
            {#if matchPassword && user.password.length !== 0} 
            <h6>Your password is not match!</h6>
            {/if}
            <button type="submit">Register</button>
        </div>
    </form>
</main>
