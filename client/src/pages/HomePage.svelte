<script>
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import axios from "../config/axiosInstance";
    import { onMount } from "svelte";
    import App from "../App.svelte";

    let arrTodos = [];
    let todo = {
        title: "",
        description: "",
        due_date: "",
        status: "",
    };
    let isLoaded = false;

    const submitTodo = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            url: "todos",
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
            data: todo,
        })
            .then(({ data }) => {
                console.log(data, "berhasil");
            })
            .catch((err) => console.log(err));
        todo = {};
    };

    onMount(async () => {
        try {
            const todo = await axios({
                method: "GET",
                url: "todos",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            })
                .then(({ data }) => {
                    arrTodos = data;
                    isLoaded = true;
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    });

    const removeTodo = (id) => {
        axios({
            method: "DELETE",
            url: `todos/${id}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        })
        .then(({data}) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        });
    };

    const editTodo = (id) => {
        console.log(id, "edit");
    };

    const patchTodo = (id) => {
        console.log(id, "patch");
    };
</script>

<style>
    .container {
        background-color: aqua;
    }

    .list {
        background-color: blanchedalmond;
    }

    .sub-list {
        display: flex;
        justify-content: space-around;
    }

    #loading {
        text-align: center;
    }

    .left {
        background-color:chocolate;
    }

    .center {
        background-color: crimson;
    }

    .right {
        background-color: darkseagreen;
    }
</style>

<div class="container">
    <h1>Add Todo</h1>
    <form on:submit={submitTodo}>
        <input
            type="text"
            name="todo"
            placeholder="todo"
            bind:value={todo.title} />
        <input
            type="text"
            name="desc"
            placeholder="description"
            bind:value={todo.description} />
        <input type="date" bind:value={todo.due_date} />
        <select name="status" bind:value={todo.status}>
            <optgroup label="select">
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </optgroup>
        </select>
        <button type="submit">Save</button>
    </form>
</div>

<div class="list">
    <h1>Todo List</h1>
    {#if isLoaded == true}
        <div class="sub-list">
            <div class="left">
                <h2>Todo</h2>
                {#each arrTodos.filter((e) => e.status === 'todo') as todo (todo.id)}
                    <label>
                        <!-- <input type=checkbox bind:checked={() => }> -->
                        {todo.title}
                        {todo.description}
                        {todo.due_date}
                        <button on:click={() => editTodo(todo.id)}>/</button>
                        <button on:click={() => removeTodo(todo.id)}>x</button>
                    </label>
                {/each}
            </div>
            <div class="center">
                <h2>Doing</h2>
                {#each arrTodos.filter((e) => e.status === 'doing') as todo (todo.id)}
                    <label>{todo.title}
                        {todo.description}
                        {todo.due_date}
                        <button on:click={() => editTodo(todo.id)}>/</button>
                        <button on:click={() => removeTodo(todo.id)}>x</button>
                    </label>
                {/each}
            </div>
            <div class="right">
                <h2>Done</h2>
                {#each arrTodos.filter((e) => e.status === 'done') as todo (todo.id)}
                    <label>{todo.title}
                        {todo.description}
                        {todo.due_date}
                        <button on:click={() => editTodo(todo.id)}>/</button>
                        <button on:click={() => removeTodo(todo.id)}>x</button>
                    </label>
                {/each}
            </div>
        </div>
    {:else}
        <h2 id="loading">Loading...</h2>
    {/if}
</div>
