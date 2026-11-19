<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { games } from '../data/games';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const router = useRouter();

const game = computed(() =>
    games.find(game => game.id === props.id)
);

function goHome() {
    router.push({ name: 'home' });
}
</script>

<template>
    <main class="game-view">
        <button class="back-button" @click="goHome">
            ← Tornar als jocs
        </button>

        <h1>{{ game.name }}</h1>

        <p>La configuració d'aquest joc estarà disponible aquí.</p>
    </main>
</template>

<style scoped>
.game-view {
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 32px;
}

.back-button {
    padding: 0;
    margin-bottom: 40px;
    border: none;
    background: none;
    color: #666;
    font-size: 14px;
    cursor: pointer;
}

.back-button:hover {
    color: #222;
}

h1 {
    font-size: 32px;
}
</style>
