<script>
    import axios from "../config/axiosInstance";
    import Swal from "sweetalert2";
    import { navigateTo } from "svelte-router-spa";

    let pageName = "Login";
    let user = {
        email: "",
        password: "",
    };

    const handleRegister = () => {
        navigateTo("/register");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "login",
            data: user,
        })
            .then(({ data }) => {
                localStorage.setItem("access_token", data.access_token);
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: `Welcome ${data.name}`,
                });
                navigateTo("/", { replace: true });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Sorry",
                    text: "Invalid Email or Password!",
                });
            });
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

    h6:hover {
        cursor: pointer;
    }

    :global(body.dark-mode) h1 {
        color: white;
    }

    img {
        width: 50%;
    }

    .banner-container {
        display: flex;
        justify-content: center;
        padding: 0 4% 4%;
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
            <form on:submit={handleLogin}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email
                        address</label>
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
                <h6 class="" on:click={handleRegister}>
                    Dont have an account ? Register here
                </h6>
                <button
                    type="submit"
                    class="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
</main>
