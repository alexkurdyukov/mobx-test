import { makeAutoObservable, runInAction } from "mobx";

import sample from "./data.json";

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Location {
    locationID: number;
    name: string;
}

export interface Env {
    envID: number;
    name: string;
}

export interface Server {
    serverID: number;
    name: string;
    locationID: number;
    envID: number;
}

export interface Card {
    location: null | Location;
    env: null | Env;
    hints: string;
    id: string;
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

    changeСoncreteHint = (payload: string, id: string) => {
        console.log("изменение хинта");
        this.cards.map((card) =>
            card.id === id
                ? {
                      ...card,
                      hint: payload,
                  }
                : card
        );
    };
    changeСoncreteLocation = (payload: string, id: string) => {
        console.log("айди карточки", id);
        this.cards.map((card) =>
            card.id === id
                ? {
                      ...card,
                      location: payload,
                  }
                : card
        );
    };
    changeСoncreteEnv = (payload: string, id: string) => {
        console.log("айди карточки", id);
        this.cards.map((card) =>
            card.id === id
                ? {
                      ...card,
                      env: payload,
                  }
                : card
        );
    };
    logCards = () => {
        console.log(this.cards);
    };

    constructor() {
        makeAutoObservable(this);
    }
}

export default new Store();
