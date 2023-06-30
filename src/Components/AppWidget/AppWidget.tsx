import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from "../../store";
import { Button } from "../../ui/Button/Button";
import styles from "./AppWidget.module.scss";
import { observer } from "mobx-react-lite";
import { faCode, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toJS } from "mobx";

// виджет, объединяющий кнопки в единую сущность
export const AppWidget = observer(() => {
    const { cards, addCard } = store;
    const logCards = () => {
        console.log(toJS(cards));
    };
    return (
        <div className={styles.appwidget}>
            <Button
                onClick={addCard}
                text="Добавить тестовую локацию"
                icon={
                    <FontAwesomeIcon
                        className={styles.Button__icon}
                        color={"#48f4f7"}
                        icon={faPlus}
                    />
                }
            ></Button>
            <Button
                onClick={logCards}
                text="Вывести результат в консоль"
                icon={<FontAwesomeIcon icon={faCode} />}
            ></Button>
        </div>
    );
});
