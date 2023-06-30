import { useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import { Env, Location } from "../../store";
import { DEFAULT_DROPDOWN_TEXT } from "../../constants";

export const Dropdown = ({
    icon,
    options,
    onClick,
    id,
}: DropdownProps<Env | Location>) => {
    //логика работы дропдауна
    const [isActive, setIsActive] = useState<boolean>(false);
    const toggleActivity = () => {
        setIsActive(!isActive);
    };
    const ref = useRef(null);
    const handleClickOutside = () => {
        setIsActive(false);
    };
    useOnClickOutside(ref, handleClickOutside);
    const [currentValue, setCurrentValue] = useState<string | null>(null);
    return (
        <div ref={ref} className={styles.dropdown} onClick={toggleActivity}>
            <div className={styles.dropdown__icon_outside}>{icon}</div>
            <div className={styles.dropdown__btn}>
                {currentValue === null ? DEFAULT_DROPDOWN_TEXT : currentValue}
            </div>
            <FontAwesomeIcon
                className={cn(styles.dropdown__icon, {
                    [styles.dropdown__icon_active]: isActive,
                })}
                icon={faCaretDown}
            />
            {isActive && (
                <ul className={styles.dropdown__content}>
                    {options &&
                        options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setCurrentValue(option.name);
                                    onClick(id, option.name);
                                }}
                                className={styles.dropdown__item}
                            >
                                {option.name}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

interface DropdownProps<T> {
    icon?: React.ReactNode;
    className?: string;
    options?: Array<T>;
    onClick: (id: string, payload: string) => void;
    id: string;
}
