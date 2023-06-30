/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TestLocation.module.scss";
import {
    faLeaf,
    faLocationDot,
    faQuestion,
    faServer,
    faTrashCan,
    faVial,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../../ui/Dropdown/Dropdown";
import { Input } from "../../ui/Input/Input";
import { observer } from "mobx-react-lite";
import store, { Card } from "../../store";

//обзервим компоненту, содержащую форму
export const TestLocation = observer(({ card }: TestLocationProps) => {
    return (
        <div className={styles.testlocation}>
            <TestLocationHeader id={card.id} />
            <TestLocationForm id={card.id} />
        </div>
    );
});

interface TestLocationProps {
    card: Card;
}

const TestLocationHeader = ({ id }: { id: string }) => {
    const { deleteCard } = store;
    return (
        <div className={styles.header}>
            <FontAwesomeIcon className={styles.header__icon} icon={faVial} />
            <h2 className={styles.header__text}>Тестовая локация {id}</h2>
            <FontAwesomeIcon
                className={styles.header__button}
                icon={faTrashCan}
                onClick={() => deleteCard(id)}
            />
        </div>
    );
};

const TestLocationForm = ({ id }: { id: string }) => {
    return (
        <form className={styles.form}>
            <div className={styles.form__top}>
                <Location id={id} />
                <Env id={id} />
                <Servers />
            </div>
            <Hint id={id} />
        </form>
    );
};

const Location = observer(({ id }: { id: string }) => {
    const { locations, changeСoncreteLocation } = store;
    return (
        <div className={styles.location}>
            <h3 className={styles.location__header}>Локация</h3>
            <Dropdown
                options={locations}
                icon={<FontAwesomeIcon icon={faLocationDot} />}
                onClick={changeСoncreteLocation}
                id={id}
            />
        </div>
    );
});

const Env = observer(({ id }: { id: string }) => {
    const { envs, changeСoncreteEnv } = store;
    return (
        <div className={styles.env}>
            <h3 className={styles.env__header}>Среда</h3>
            <Dropdown
                id={id}
                options={envs}
                icon={<FontAwesomeIcon icon={faLeaf} />}
                onClick={changeСoncreteEnv}
            />
        </div>
    );
});

const Hint = observer(({ id }: { id: string }) => {
    const { changeСoncreteHint } = store;
    return (
        <div className={styles.hint}>
            <h3 className={styles.hint__header}>Подсказка</h3>
            <Input
                icon={<FontAwesomeIcon icon={faQuestion} />}
                onBlur={changeСoncreteHint}
                id={id}
            />
        </div>
    );
});

const Servers = () => {
    const { servers } = store;
    return (
        <div className={styles.servers}>
            <h3 className={styles.servers__header}>Серверы</h3>
            <FontAwesomeIcon icon={faServer} />
            <div className={styles.servers__list}>
                {servers.map((server, index) => `${server.name}`).join(", ")}
            </div>
        </div>
    );
};
