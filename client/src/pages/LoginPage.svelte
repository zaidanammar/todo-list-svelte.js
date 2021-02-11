<script>
    import axios from "../config/axiosInstance";
    import Swal from "sweetalert2";

    let pageName = "Login Page";
    let user = {
        email: "",
        password: "",
    };

    const handleLogin = () => {
        axios({
            method: "POST",
            url: "login",
            data: user,
        }).then(({ result }) => {
            localStorage.setItem({ access_token: result.access_token });
            Swal.fire({
                icon: "success",
                title: "Congratss!",
                text: "Login Success",
            });
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Sorry",
                text: "Invalid Email or Password!",
            });
        })
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
</style>

<main>
    <h1>{pageName}!</h1>

    <div class="container">
        <form on:submit={handleLogin}>
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
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</main>
