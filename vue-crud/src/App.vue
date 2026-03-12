<template>
    <h1> Olympus Entertainment <img src="https://dbl-discord.usercontent.prism.gg/icons/530422209626243094/a_07322c3851201ed5e157e5b70ec42041.png?size=256" width="100"></h1>

    <form @submit.prevent="saveTask">
      <input v-model="newTask" placeholder="Fuck Mark" />
      <button>
        {{ editingTaskId ? 'Save' : 'Add' }}
      </button>
    </form>
    <ul>
        <li v-for="task in tasks" :key="task.id">
            {{ task.title }}
            <button @click="startEdit(task)">✏️</button>
            <button @click="deleteTask(task.id)">❌</button>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const newTask = ref('')
const editingTaskId = ref(null)

const API_URL = 'http://localhost:3000/tasks'

onMounted(fetchTasks)

async function fetchTasks() {
  const res = await axios.get(API_URL)
  tasks.value = res.data
}

async function saveTask() {
  if (!newTask.value) return

  if (editingTaskId.value) {
    await axios.put(`${API_URL}/${editingTaskId.value}`, {
      id: editingTaskId.value,
      title: newTask.value
    })
    editingTaskId.value = null
  } else {
    await axios.post(API_URL, {
      title: newTask.value
    })
  }

  newTask.value = ''
  fetchTasks()
}

function startEdit(task) {
  newTask.value = task.title
  editingTaskId.value = task.id
}

async function deleteTask(id) {
  await axios.delete(`${API_URL}/${id}`)
  fetchTasks()
}

</script>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f5f7fa;
}

#app {
  max-width: 500px;
  margin: 4rem auto;
  background: #D3AF37;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

button {
  border: solid;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

form button {
  background: #42b883;
  color: white;
}

form button:hover {
  background: #369f6b;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

li button {
  margin-left: 0.3rem;
  background: transparent;
}

li button:hover {
  background: #f0f0f0;
}
</style>
