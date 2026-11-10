
import { useRevalidator } from "react-router";

export const StatisticsPage = () => {
    const revalidator = useRevalidator();

    return (
        <div>
            <h2>Статистика</h2>

            <button
                onClick={() => revalidator.revalidate()}
                disabled={revalidator.state === "loading"}
            >
                {revalidator.state === "loading"
                    ? "Обновление..."
                    : "Обновить данные"}
            </button>
        </div>
    );
};
