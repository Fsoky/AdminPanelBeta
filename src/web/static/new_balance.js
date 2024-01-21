import { fetchData, showSnackBar } from "./main.js";

document.querySelector(".icon").addEventListener(
    "click", () => {window.location.href = "/"}
);

document.querySelector("#setNewBalance").addEventListener(
    "submit", async (event) => {
        event.preventDefault();

        let form = new FormData(event.target);
        let url = new URL(window.location.href);
        let urlParams = new URLSearchParams(url.search);

        let amount = form.get("amount");
        let userID = urlParams.get("id");

        let response = await fetchData(
            "/handle-action", {
                id: userID,
                amount: amount,
                action: event.submitter.name
            }
        );

        if (response.success) {
            showSnackBar("🤑 Баланс успешно обновлен!");
        } else {
            showSnackBar("❌ Неизвестная ошибка!");
        }
    }
);