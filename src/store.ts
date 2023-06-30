import { makeAutoObservable, runInAction } from "mobx";

import sample from "./data.json";

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Server {
    serverID: number;
    name: string;
    locationID: number;
    envID: number;
}

export class Store {
    isLoaded = false;
    locations: Location[] = [];
    envs: Env[] = [];
    servers: Server[] = [];
    cards: Card[] = [];

    fetchData = async () => {
        await sleep(3000);
        runInAction(() => {
            this.locations = sample.locations;
            this.envs = sample.envs;
            this.servers = sample.servers;
            this.isLoaded = true;
        });
    };

    addCard = () => {
        this.cards.push({
            location: null,
            env: null,
            hints: "",
            id: String(this.cards.length + 1),
        });
    };

    deleteCard = (id: string) => {
        this.cards = this.cards.filter((card) => card.id !== id);
    };

    changeСoncreteHint = (id: string, payload: string) => {
        console.log(`id - ${id}, payload - ${payload}`);
        const cards = this.cards.map((card) =>
            card.id === id
                ? {
                      ...card,
                      hints: payload,
                  }
                : card
        );
        this.cards = cards;
    };

    // из дропдауна подаем также строку с именем локации
    changeСoncreteLocation = (id: string, payload: string) => {
        const envPayload = this.locations.find(
            (location) => location?.name === payload
        );
        const cards = this.cards.map((card) =>
            card.id === id
                ? {
                      ...card,
                      location: envPayload,
                  }
                : card
        );
        this.cards = cards;
    };

    // в пэйлоад передаем имя из дропдауна, по нему и ищем нужный EnvObject в стэйте Env[]
    changeСoncreteEnv = (id: string, payload: string) => {
        const envPayload = this.envs.find((env) => env?.name === payload);
        const cards = this.cards.map((card) =>
            card.id === id
                ? {
                      ...card,
                      env: envPayload,
                  }
                : card
        );
        this.cards = cards;
    };
    constructor() {
        makeAutoObservable(this);
    }
}

export interface Card {
    location: null | Location | undefined;
    env: null | Env | undefined;
    hints: string;
    id: string;
}

export interface Env {
    envID: number;
    name: string;
}

export interface Location {
    locationID: number;
    name: string;
}

export default new Store();
