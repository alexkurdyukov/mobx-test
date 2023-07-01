import { observer } from "mobx-react-lite";
import store from "../../store";
import styles from "./TestLocation.module.scss";
import { AppWidget } from "../AppWidget/AppWidget";
import { TestLocation } from "../TestLocation/TestLocation";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";

export const TestLocationsList = observer(() => {
    const { fetchData, isLoaded } = store;
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!isLoaded) {
        return <Loader />;
    }
    return (
        <div className={styles.TestLocationsList}>
            <LocationList />
            <AppWidget />
        </div>
    );
});

const LocationList = observer(() => {
    const { cards } = store;
    return (
        <div className={styles.TestLocationsList__wrapper}>
            {cards.map((card, index) => (
                <TestLocation card={card} key={card.id} />
            ))}
        </div>
    );
});
