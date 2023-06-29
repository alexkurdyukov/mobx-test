import { observer } from "mobx-react-lite";
import { Loader } from "../Loader/Loader";
import store from "../../store";
import { TestLocation } from "../TestLocation/TestLocation";
import { AppWidget } from "../AppWidget/AppWidget";
import styles from "./TestLocation.module.scss";

export const TestLocationsList = observer(() => {
    const { fetchData, isLoaded } = store;
    fetchData();
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
    const { cards, isLoaded } = store;
    if (!isLoaded) {
        return <Loader />;
    }
    return (
        <div className={styles.TestLocationsList__wrapper}>
            {cards.map((card, index) => (
                <TestLocation card={card} key={card.id} />
            ))}
        </div>
    );
});
