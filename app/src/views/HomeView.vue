<script setup>
import { games } from '../data/games';
import GameCard from '../components/HomeGameCard.vue';

defineEmits(['select-game']);
</script>

<template>
    <main class="home">
        <header class="home__header">
            <h1>Juga des de casa</h1>
            <p>Un espai per crear i configurar passatemps.</p>
        </header>

        <section class="home__games">
            <h2>Jocs disponibles</h2>

            <div class="games-grid">
                <GameCard
                    v-for="game in games"
                    :key="game.id"
                    :game="game"
                    @select="$emit('select-game', $event)"
                />
            </div>
        </section>
    </main>
</template>

<style scoped>
.home {
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 32px;
}

.home__header {
    margin-bottom: 60px;
}

.home__header h1 {
    margin: 0 0 8px;
    font-size: 38px;
    font-weight: 700;
}

.home__header p {
    margin: 0;
    color: #777;
    font-size: 16px;
}

.home__games h2 {
    margin-bottom: 24px;
    font-size: 22px;
}

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
}

@media (max-width: 600px) {
    .home {
        padding: 32px 20px;
    }

    .home__header {
        margin-bottom: 40px;
    }
}
</style>
