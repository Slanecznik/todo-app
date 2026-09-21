import { useState } from "react";

export const useCounter = () => {

    // Создаём состояние внутри Custom Hook
    const [count, setCount] = useState(0);

    // Возвращаем наружу то,
    // чем компонент сможет пользоваться
    return {
        count,
        setCount
    };
};