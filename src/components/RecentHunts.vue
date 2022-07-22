<script setup>
import RecentHunt from "./RecentHunt.vue";
</script>

<template>
  <div class="recent-hunts-container">
    <table>
      <thead>
        <tr>
          <th>Recent Hunts</th>
          <th>Monster Name</th>
          <th>Quest Status</th>
          <th>Carts</th>
          <th>Damage</th>
        </tr>
      </thead>
      <tbody>
        <RecentHunt />
        <RecentHunt />
        <RecentHunt />
        <RecentHunt />
        <RecentHunt />
      </tbody>
    </table>
  </div>
</template>

<style module lang="scss">
.recent-hunts-container {
  width: 100%;
  height: 100%;
  display: block;
  flex-direction: row;
}

table {
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns:
    minmax(150px, 100%)
    minmax(150px, 100%)
    minmax(150px, 100%)
    minmax(150px, 100%)
    minmax(150px, 100%);
}

thead,
tbody,
tr {
  display: contents;
}

th,
td {
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th {
  background: #6c7ae0;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
  position: sticky;
}

th:last-child {
  border: 0;
}

td {
  padding-top: 10px;
  padding-bottom: 10px;
  color: #808080;
}

tr:nth-child(even) td {
  background: #f8f6ff;
}
</style>
