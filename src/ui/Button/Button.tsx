import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

export const Button = ({ className, onClick, text, icon }: ButtonProps) => {
    return (
        <div onClick={onClick} className={cn(styles.Button, className)}>
            {icon ? (
                icon
            ) : (
                <FontAwesomeIcon
                    className={styles.Button__icon}
                    color={"#48f4f7"}
                    icon={faPlus}
                />
            )}
            <p className={styles.Button__text}>{text}</p>
        </div>
    );
};

interface ButtonProps {
    className?: string;
    onClick: () => void;
    text: string;
    icon?: React.ReactNode;
}
