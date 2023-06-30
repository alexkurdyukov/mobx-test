import { ChangeEvent } from "react";
import styles from "./Input.module.scss";
import cn from "classnames";

export const Input = ({ className, icon, onBlur, id }: InputProps) => {
    return (
        <div className={cn(styles.Input, className)}>
            <div className={styles.Input__icon}>{icon}</div>
            <input
                onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                    onBlur(id, e.target.value)
                }
                placeholder={"Комментарий по локации"}
                className={styles.Input__container}
            />
        </div>
    );
};

interface InputProps {
    icon?: React.ReactNode;
    className?: string;
    onBlur: any;
    id: string;
}
