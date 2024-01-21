import { fetchData, showSnackBar } from "./main.js";

document.querySelector(".icon").addEventListener(
    "click", () => {window.location.href = "/"}
);

document.querySelector("#setNewStatus").addEventListener(
    "submit", async (event) => {
        event.preventDefault();

        let form = new FormData(event.target);
        let url = new URL(window.location.href);
        let urlParams = new URLSearchParams(url.search);

        let status = form.get("status");
        let userID = urlParams.get("id");

        let response = await fetchData(
            "/handle-action", {
                id: userID,
                status: status,
                action: event.submitter.name
            }
        );

        if (response.success) {
            showSnackBar("☕ Статус обновлен!");
        } else {
            showSnackBar("❌ Неизвестная ошибка!");
        }
    }
);