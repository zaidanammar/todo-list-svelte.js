<script>
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import axios from "../config/axiosInstance";
    import { onMount } from "svelte";
    import Swal from "sweetalert2";
    import Navbar from "../components/Navbar.svelte";
    import { writable } from "svelte/store";

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;
            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
            };
        },
    });

    let Todos = writable([]);
    let showEdit = false;
    let showAdd = false;
    let todo = {
        title: "",
        description: "",
        due_date: "",
        status: "",
    };

    let todoById = {};

    const submitTodo = (e) => {
        e.preventDefault();
        if (todo.title && todo.due_date && todo.status && todo.due_date) {
            if (new Date(todo.due_date) < new Date()) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The date was expired!",
                });
            } else {
                axios({
                    method: "POST",
                    url: "todos",
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                    data: todo,
                })
                    .then(({ data }) => {
                        fetchData();
                        Swal.fire({
                            icon: "success",
                            title: "Congratss!",
                            text: "Your todo has been saved",
                        });
                        showAdd = false;
                    })
                    .catch((err) => console.log(err));
                todo = {};
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Input the empty field!",
            });
        }
    };

    const submitEditedTodo = (e) => {
        e.preventDefault();
        axios({
            method: "PUT",
            url: `todos/${todoById.id}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
            data: todoById,
        })
            .then(({ data }) => {
                fetchData();
                showEdit = false;
            })
            .catch((err) => console.log(err));
    };

    const fetchData = () => {
        axios({
            method: "GET",
            url: "todos",
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        })
            .then(({ data }) => {
                Todos.set(data);
            })
            .catch((err) => console.log(err));
    };

    onMount(() => {
        fetchData();
    });

    const removeTodo = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axios({
                        method: "DELETE",
                        url: `todos/${id}`,
                        headers: {
                            access_token: localStorage.getItem("access_token"),
                        },
                    })
                        .then(({ data }) => {
                            fetchData();
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your todo has been deleted.",
                                "success"
                            );
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your todo is safe :)",
                        "error"
                    );
                }
            });
    };

    const getTodoById = (id) => {
        axios({
            method: "GET",
            url: `todos/${id}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        })
            .then(({ data }) => {
                todoById = data;
                showEdit = true;
            })
            .catch((err) => console.log(err));
    };

    const handleShowAdd = () => {
        showAdd = true;
    };
</script>

<style>
    .container {
        margin-bottom: 3%;
    }

    .list {
        margin-left: 1%;
        margin-right: 1%;
    }

    .sub-list {
        display: flex;
        justify-content: space-around;
    }

    .left {
        background-color: rgb(186, 119, 231);
        width: 30%;
        min-height: 500px;
        border-radius: 3%;
        padding: 0 0.5% 2%;
        margin-bottom: 1.5%;
    }

    .center {
        width: 30%;
        background-color: skyblue;
        min-height: 500px;
        border-radius: 3%;
        padding: 0 0.5% 2%;
        margin-bottom: 1.5%;
    }

    .right {
        background-color: darkseagreen;
        width: 30%;
        min-height: 500px;
        border-radius: 3%;
        padding: 0 0.5% 2%;
        margin-bottom: 1.5%;
    }

    .add-todo {
        display: flex;
        justify-content: center;
        margin: 2% 2% 2%;
    }

    i:hover {
        cursor: pointer;
    }

    .row-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .row-icon {
        display: flex;
        flex-direction: row;
        justify-content: end;
    }

    .card {
        margin: 3% 2% 0;
    }

    h2,
    h1 {
        text-align: center;
        font-weight: 700;
        margin: 1% 0;
        text-shadow: 2px 2px 2px rgb(145, 143, 143);
    }

    :global(body.dark-mode) h2 {
        color: white;
    }

    :global(body.dark-mode)  h1 {
        color: white;
    }

    :global(body.dark-mode)  h5 {
        color: grey;
    }

    :global(body.dark-mode) p {
        color: grey;
    }

    :global(body.dark-mode) i {
        color: grey;
    }
</style>

<Navbar />
<div classname="container">
    <div class="list">
        <h1>Todo List</h1>
        <div class="add-todo">
            <button
                type="button"
                class="btn btn-secondary"
                on:click={handleShowAdd}>
                Add Todo</button>
        </div>
        {#if showAdd}
            <div class="container">
                <form on:submit={submitTodo}>
                    <div class="mb-3">
                        <label
                            for="exampleInputEmail1"
                            class="form-label">Title</label>
                        <input
                            type="text"
                            bind:value={todo.title}
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleInputPassword1"
                            class="form-label">Description</label>
                        <input
                            type="text"
                            bind:value={todo.description}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleInputPassword1"
                            class="form-label">Due date</label>
                        <input
                            type="date"
                            bind:value={todo.due_date}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleInputPassword1"
                            class="form-label">Status</label>
                        <select
                            class="form-select"
                            bind:value={todo.status}
                            aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        class="btn btn-primary">Submit</button>
                    <button
                        type="submit"
                        class="btn btn-danger"
                        on:click={() => {
                            showAdd = false;
                        }}>Cancel</button>
                </form>
            </div>
        {/if}
        {#if showEdit}
            <div class="container">
                <form on:submit={submitEditedTodo}>
                    <div class="mb-3">
                        <label
                            for="exampleInputEmail1"
                            class="form-label">Title</label>
                        <input
                            type="text"
                            bind:value={todoById.title}
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleInputPassword1"
                            class="form-label">Description</label>
                        <input
                            type="text"
                            bind:value={todoById.description}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleInputPassword1"
                            class="form-label">Due date</label>
                        <input
                            type="date"
                            bind:value={todoById.due_date}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label
                            for="exampleInputPassword1"
                            class="form-label">Status</label>
                        <select
                            class="form-select"
                            bind:value={todoById.status}
                            aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        class="btn btn-primary">Submit</button>
                    <button
                        type="submit"
                        class="btn btn-danger"
                        on:click={() => {
                            showEdit = false;
                        }}>Cancel</button>
                </form>
            </div>
        {/if}

        <div class="sub-list">
            <div class="left">
                <h2>Todo</h2>
                {#each $Todos.filter((e) => e.status === 'todo').sort((a,b) => new Date(a.due_date) - new Date(b.due_date)) as todo (todo.id)}
                    <div
                        class="row"
                        in:receive={{ key: todo.id }}
                        out:send={{ key: todo.id }}
                        animate:flip>
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="row-item">
                                        <h5 class="card-title">{todo.title}</h5>
                                        <p class="card-text">{todo.due_date}</p>
                                    </div>
                                    <p class="card-text">{todo.description}</p>
                                    <div class="row-icon">
                                        <i
                                            class="bi bi-pencil-square me-3"
                                            on:click={() => getTodoById(todo.id)} />
                                        <i
                                            class="bi bi-trash-fill"
                                            on:click={() => removeTodo(todo.id)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="center">
                <h2>Doing</h2>
                {#each $Todos.filter((e) => e.status === 'doing').sort((a,b) => new Date(a.due_date) - new Date(b.due_date)) as todo (todo.id)}
                    <div
                        class="row"
                        in:receive={{ key: todo.id }}
                        out:send={{ key: todo.id }}
                        animate:flip>
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="row-item">
                                        <h5 class="card-title">{todo.title}</h5>
                                        <p class="card-text">{todo.due_date}</p>
                                    </div>
                                    <p class="card-text">{todo.description}</p>
                                    <div class="row-icon">
                                        <i
                                            class="bi bi-pencil-square me-3"
                                            on:click={() => getTodoById(todo.id)} />
                                        <i
                                            class="bi bi-trash-fill"
                                            on:click={() => removeTodo(todo.id)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="right">
                <h2>Done</h2>
                {#each $Todos.filter((e) => e.status === 'done').sort((a,b) => new Date(a.due_date) - new Date(b.due_date)) as todo (todo.id)}
                    <div
                        class="row"
                        in:receive={{ key: todo.id }}
                        out:send={{ key: todo.id }}
                        animate:flip>
                        <div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="row-item">
                                        <h5 class="card-title">{todo.title}</h5>
                                        <p class="card-text">{todo.due_date}</p>
                                    </div>
                                    <p class="card-text">{todo.description}</p>
                                    <div class="row-icon">
                                        <i
                                            class="bi bi-pencil-square me-3"
                                            on:click={() => getTodoById(todo.id)} />
                                        <i
                                            class="bi bi-trash-fill"
                                            on:click={() => removeTodo(todo.id)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
