<script setup>
defineProps({
    game: {
        type: Object,
        required: true
    }
});

defineEmits(['select']);
</script>

<template>
    <button class="game-card" @click="$emit('select', game)">
        <img
            class="game-card__image"
            :src="game.image"
            :alt="game.name"
        />

        <div class="game-card__content">
            <h2>{{ game.name }}</h2>
            <span>Configurar joc →</span>
        </div>
    </button>
</template>

<style scoped>
.game-card {
    display: block;
    width: 100%;
    padding: 0;
    text-align: left;
    color: inherit;
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.game-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.game-card__image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

.game-card__content {
    padding: 18px;
}

.game-card__content h2 {
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 600;
}

.game-card__content span {
    color: #666;
    font-size: 14px;
}
</style>
