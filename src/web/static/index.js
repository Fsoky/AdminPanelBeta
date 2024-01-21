import { fetchData, showSnackBar } from "./main.js";

document.querySelector("#validate").addEventListener(
    "submit", async (event) => {
        event.preventDefault();

        let form = new FormData(event.target);
        let userID = form.get("userID");
        let action = event.submitter.name;

        let response = await fetchData("/check-user", {id: userID});

        if (response.success) {
            window.location.href = `/${action}?id=${userID}`;
        } else {
            showSnackBar("❌ Пользователь не найден!");
        }
    }
);