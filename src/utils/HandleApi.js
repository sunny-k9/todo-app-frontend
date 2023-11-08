import axios from 'axios'

const baseURL = "http://localhost:5000"

// Read all tasks and display on frontend

const getAllTasks = (setTask) => {

    axios
        .get(baseURL)
        .then(({ data }) => {
            console.log('data --->', data);
            setTask(data)
        })
}

// Create and add a task in DB and repopulate frontend
const addTask = (text, setText, setTask) => {
    if (text === "") return false
    axios
        .post(`${baseURL}/create`, { text })
        .then((data) => {
            console.log(data);
            setText("")
            getAllTasks(setTask)
        })
        .catch((err) => console.log(err))
}

// Edit a task and Update in DB and repopulate frontend
const updateTask = (taskId, text, setTask, setText, setIsUpdating) => {
    if (text === "") return false

    axios
        .put(`${baseURL}/update`, { _id: taskId, text })
        .then((data) => {
            console.log(data);
            setText("")
            setIsUpdating(false)
            getAllTasks(setTask)
        })
        .catch((err) => console.log(err))
}

//Delete a task and repopulate frontend
const deleteTask = (_id, setTask) => {
    
    axios
        .delete(`${baseURL}/delete/?id=${_id}`)
        .then((data) => {
            console.log(data)
            getAllTasks(setTask)
        })
        .catch((err) => console.log(err))
}

export { getAllTasks, addTask, updateTask, deleteTask }