import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "../../store";
import { Button } from "../../ui/Button/Button";
import styles from "./AppWidget.module.scss";
import { observer } from "mobx-react-lite";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export const AppWidget = observer(() => {
    const { cards, addCard, logCards } = store;
    return (
        <div className={styles.appwidget}>
            <Button
                onClick={() => {
                    addCard();
                }}
                text="Добавить тестовую локацию"
            ></Button>
            <Button
                onClick={() => {
                    console.log(cards);
                }}
                text="Вывести результат в консоль"
                icon={<FontAwesomeIcon icon={faCode} />}
            ></Button>
        </div>
    );
});
