<script>
    import { quintOut } from "svelte/easing";
    import { crossfade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import axios from "../config/axiosInstance";
    import { onMount, afterUpdate, beforeUpdate } from "svelte";
    import App from "../App.svelte";

    let showEdit = false;
    let showAdd = false;
    let isLoaded = false;
    let arrTodos = [];
    let todo = {
        title: "",
        description: "",
        due_date: "",
        status: "",
    };

    let todoById = {};
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
                console.log(data, "berhasil");
            })
            .catch((err) => console.log(err));
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

    beforeUpdate(() => {
        console.log("before update");
    });

    afterUpdate(() => {
        console.log("after update");
    });

    const removeTodo = (id) => {
        axios({
            method: "DELETE",
            url: `todos/${id}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
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

    const patchTodo = (id) => {
        console.log(id, "patch");
    };

    const handleShowAdd = () => {
        showAdd = true;
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
        background-color: chocolate;
    }

    .center {
        background-color: crimson;
    }

    .right {
        background-color: darkseagreen;
    }

    .add-todo {
        display: flex;
        justify-content: end;
        margin-top: 2%;
    }
</style>

<div class="add-todo"><button on:click={handleShowAdd}>Add Todo</button></div>

{#if showAdd}
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
            <button
                on:click={() => {
                    showAdd = false;
                }}>Cancel</button>
        </form>
    </div>
{/if}

{#if showEdit}
    <div class="container">
        <h1>Edit Todo</h1>
        <form on:submit={submitEditedTodo}>
            <input
                type="text"
                name="todo"
                placeholder="todo"
                bind:value={todoById.title} />
            <input
                type="text"
                name="desc"
                placeholder="description"
                bind:value={todoById.description} />
            <input type="date" bind:value={todoById.due_date} />
            <select name="status" bind:value={todoById.status}>
                <optgroup label="select">
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </optgroup>
            </select>
            <button type="submit">Save</button>
            <button
                on:click={() => {
                    showEdit = false;
                }}>Cancel</button>
        </form>
    </div>
{/if}

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
                        <button on:click={() => getTodoById(todo.id)}>/</button>
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
                        <button on:click={() => getTodoById(todo.id)}>/</button>
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
                        <button on:click={() => getTodoById(todo.id)}>/</button>
                        <button on:click={() => removeTodo(todo.id)}>x</button>
                    </label>
                {/each}
            </div>
        </div>
    {:else}
        <h2 id="loading">Loading...</h2>
    {/if}
</div>
