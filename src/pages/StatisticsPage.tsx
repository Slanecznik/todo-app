import { useNavigate } from "react-router";
import { Statistics } from "../components/Statistics";

export function StatisticsPage() {
    const navigate = useNavigate();
    return (
        <section>
            <h1>Статистика задач</h1>
            <Statistics />
            <button onClick={() => navigate("/")}>
                Вернуться к задачам
            </button>
        </section>
    );
}