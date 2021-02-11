<script>
    import axios from "../config/axiosInstance";
    import Swal from "sweetalert2";
    import { navigate } from "svelte-routing";
    import { onMount, afterUpdate, beforeUpdate } from "svelte";

    let pageName = "Register Page";
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
        navigate("/login");
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
            navigate("/login", { replace: true });
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
        color: #b40606;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 400;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .container {
        text-align: left;
        width: 60%;
    }

    .pass-notif {
        margin-bottom: 2%;
        color: red;
    }

    .login-btn {
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 1%;
    }
</style>

<main>
    <h1>{pageName}!</h1>

    <div class="container">
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
            <h6 class="">Already have an account ? <button class="login-btn" on:click={handleLogin}>login</button> here</h6>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</main>
