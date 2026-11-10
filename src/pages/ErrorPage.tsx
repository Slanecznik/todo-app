import { useRouteError } from "react-router";

export const ErrorPage = () => {
    const error = useRouteError();

    console.error(error);

    return (
        <div>
            <h1>Упс! Что-то пошло не так.</h1>
            <p>Не удалось открыть эту страницу.</p>
        </div>
    );
};