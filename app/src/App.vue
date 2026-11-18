<script setup>
import { ref } from 'vue';

import HomeView from './views/HomeView.vue';
import GameView from './views/GameView.vue';

const selectedGame = ref(null);

function selectGame(game) {
    selectedGame.value = game;
}

function goHome() {
    selectedGame.value = null;
}
</script>

<template>
    <HomeView
        v-if="!selectedGame"
        @select-game="selectGame"
    />

    <GameView
        v-else
        :game="selectedGame"
        @back="goHome"
    />
</template>
