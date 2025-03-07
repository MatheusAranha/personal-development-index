import { Game } from "api/util-interfaces";

const games: Game[] = [
    {
        id:'settlers-in-the-can',
        name: 'Settlers in the Can',
        image: '/assets/beans.png',
        description: 'Help your bug family claim the best real estate in a spilled can of beans.',
        price: 35,
        rating: Math.random(),
    },
    {
        id:'chess-pie',
        name: 'Chess Pie',
        image: '/assets/chess.png',
        description: 'A circular game of Chess that you can eat as you play.',
        price: 15,
        rating: Math.random(),
    },
    {
        id:'purrfection',
        name: 'Purrfection',
        image: '/assets/cat.png',
        description: 'A cat grooming contest goes horribly wrong.',
        price: 45,
        rating: Math.random(),
    },
];

export const getAllGames = () => games;
export const getGame = (id: string) => games.find((game) => game.id === id);
