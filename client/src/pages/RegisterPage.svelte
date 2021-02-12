<script>
    import axios from "../config/axiosInstance";
    import Swal from "sweetalert2";
    import { navigateTo } from "svelte-router-spa";
    import { afterUpdate } from "svelte";

    let pageName = "Register";
    let user = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
    };
    $: matchPassword = false;
    

    afterUpdate(() => {
       handlePassword()
    });

    const handlePassword = () => {
        if (user.password.length !==0 && user.rePassword.length !== 0 && user.password === user.rePassword) {
           matchPassword = true
        } else {
            matchPassword = false
        }
    }

    const handleLogin  = () => {
        navigateTo("/login");
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (user.name && user.email && user.password && user.rePassword && matchPassword === true) {
              axios({
            method: "POST",
            url: "register",
            data: user,
        }).then(({ result }) => {
            Swal.fire({
                icon: "success",
                title: "Congratss!",
                text: "Register Success",
            });
            navigateTo("/login", { replace: true });
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Sorry",
                text: "Please input an empty field!",
            });
        })
        } 
       
    };
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        font-weight: 600;
        font-size: 4em;
        text-shadow: 2px 2px 2px rgb(145, 143, 143);
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .container {
        text-align: left;
        width: 50%;
        background-color: white;
        padding: 2%;
        margin-top: 2%;
        border-radius: 3%;
        box-shadow: 5px 5px 5px rgb(145, 143, 143);
    }

    img {
        width: 50%;
    }

    .banner-container {
        display: flex;
        justify-content: center;
        padding: 0 4% 4%;
    }

    .pass-notif {
        margin-bottom: 2%;
        color: red;
    }

    h6:hover{
        cursor: pointer;
    }

    :global(body.dark-mode) h1 {
        color: white;
    }

</style>

<main>
    <h1>{pageName}</h1>

    <div class="container">
        <div class="banner-container">
            <img
                src="https://cdn.discordapp.com/attachments/760167928065818686/809692266385113128/bg-todo.png"
                alt="Girl in a jacket" />
        </div>
        <form on:submit={handleRegister}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    bind:value={user.name} />
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    bind:value={user.email} />
            </div>
            <div class="mb-3">
                <label
                    for="exampleInputPassword1"
                    class="form-label">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    bind:value={user.password} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Re-enter
                    Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    bind:value={user.rePassword} />
            </div>
            {#if matchPassword === false && user.rePassword} 
            <h6 class="pass-notif">your password is not match!</h6>
            {/if}
            <h6 class="" on:click={handleLogin}>Already have an account ? login here</h6>
            <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </form>
    </div>
</main>
