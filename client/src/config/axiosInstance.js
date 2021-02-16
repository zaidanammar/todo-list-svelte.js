import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://zaidan-todo-list-app.herokuapp.com/'
})

export default instance