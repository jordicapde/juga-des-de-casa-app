export const games = [
    {
        id: '1',
        name: 'Orbito',
        image: 'https://cf.geekdo-images.com/s59Zt0vHkIQMgqD8HaxPxQ__original/img/NwiaPiAyE-Ff2yCK_ewBh9HYIu4=/0x0/filters:format(jpeg)/pic8960086.jpg',
        instructions: null,
        path: 'games/1_Orbito'
    }
];

export function getGamePaths(game) {
    return {
        root: game.path,
        script: `${game.path}/script.jsx`,
        config: `${game.path}/config`,
        assets: `${game.path}/assets`,
        output: `${game.path}/output`
    };
}