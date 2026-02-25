<template>
  <div>
    <h1>Daily Tracker</h1>

    <div v-for="task in todaysTasks" :key="task.name">
      <label>
        <input type="checkbox" v-model="task.completed" />
        {{ task.name }}
      </label>
    </div>

    <p>Score: {{ score }}%</p>
    <p>Streak: {{ streak }} days</p>

    <button @click="saveEntry">Save</button>
  </div>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL } = import.meta.env

export default {
  data() {
    return {
      todaysTasks: [],
      entries: []
    };
  },
  computed: {
    score() {
      const total = this.todaysTasks.length;
      const done = this.todaysTasks.filter(t => t.completed).length;
      return total ? Math.round((done / total) * 100) : 0;
    },
    streak() {
      let streak = 0;
      for (let i = this.entries.length - 1; i >= 0; i--) {
        if (this.entries[i].score >= 80) streak++;
        else break;
      }
      return streak;
    }
  },
  methods: {
    getDayTasks() {
      const day = new Date().getDay();

      const schedule = {
        1: ['BJJ', 'Nutrition', 'Mobility'],
        2: ['PT', 'Nutrition', 'Mobility'],
        3: ['Jog', 'Nutrition', 'Mobility'],
        4: ['BJJ', 'Nutrition', 'Mobility'],
        5: ['Strength', 'Nutrition', 'Mobility'],
        6: ['Light Activity', 'Nutrition', 'Mobility'],
        0: ['Rest']
      };

      return (schedule[day] || []).map(task => ({
        name: task,
        completed: false
      }));
    },

    async saveEntry() {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        data: this.todaysTasks,
        score: this.score
      };

      await axios.post(`${VITE_API_URL}/api/entry`, entry);
      this.fetchEntries();
    },

    async fetchEntries() {
      const res = await axios.get(`${VITE_API_URL}/api/entries`);
      this.entries = res.data;
    }
  },

  mounted() {
    this.todaysTasks = this.getDayTasks();
    this.fetchEntries();
  }
};
</script>