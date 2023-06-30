import styles from "./Button.module.scss";
import cn from "classnames";

export const Button = ({ className, onClick, text, icon }: ButtonProps) => {
    return (
        <div onClick={onClick} className={cn(styles.Button, className)}>
            {icon && icon}
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
