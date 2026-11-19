<script setup>
import { useRouter } from 'vue-router';
import { games } from '../data/games';
import HomeGameCard from '../components/HomeGameCard.vue';

const router = useRouter();

function openGame(game) {
    router.push({
        name: 'game',
        params: { id: game.id }
    });
}
</script>

<template>
    <main class="home">
        <header class="home_header">
            <h1>Juga des de casa</h1>
            <p>Una eina per facilitar la creació i la generació automàtica de jocs per les publicacions "Juga des de casa"</p>
        </header>

        <section class="home_games">
            <h2>Jocs disponibles</h2>

            <div class="games-grid">
                <HomeGameCard
                  v-for="game in games"
                  :key="game.id"
                  :game="game"
                  @select="openGame"
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

.home_header {
    margin-bottom: 60px;
}

.home_header h1 {
    margin: 0 0 8px;
    font-size: 38px;
    font-weight: 700;
}

.home_header p {
    margin: 0;
    color: #777;
    font-size: 16px;
}

.home_games h2 {
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

    .home_header {
        margin-bottom: 40px;
    }
}
</style>
