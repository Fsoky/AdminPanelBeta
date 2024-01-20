let tg = window.Telegram.WebApp;
tg.headerColor = "#9538ec";

let snackbar = document.querySelector(".snackbar");

async function fetchData(url, data) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Перебрасываем ошибку, чтобы ее обработать далее, если нужно
    }
}

async function changeBalancePage() {
    let user_id = document.querySelector("#user_id");
    let response = await fetchData("/check-user", {id: user_id.value.trim()});
    
    if (response.success) {
        window.location.href = `/change-balance?id=${user_id.value.trim()}`;
    } else {
        snackbar.style.display = 'flex';
        snackbar.textContent = "Такого пользователя нет!";
    
        // Закрыть snackbar через 3 секунды (можете изменить согласно вашим требованиям)
        setTimeout(() => {
            snackbar.style.display = 'none';
        }, 3000);
    }
}

async function changeBalance() {
    let balance = document.querySelector("#amount");
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    let data = {
        id: params.get("id"),
        balance: balance.value.trim()
    };
    let response = await fetchData("/new-balance", data);
    
    snackbar.style.display = "flex";
    setTimeout(() => {
        snackbar.style.display = 'none';
    }, 3000);

    if (response.success) {
        snackbar.textContent = "Баланс изменен!";
    } else {
        snackbar.textContent = "Неизвестная ошибка!";
    }
}

function checkInput() {
    let btns = document.querySelectorAll(".button-9");
    let input = document.querySelector("#user_id");
    
    if (input.value.trim().length > 0) {
        for(let btn of btns) {
            btn.disabled = false;
        }
    } else {
        for(let btn of btns) {
            btn.disabled = true;
        } 
    }
}

document.querySelector(".icon").addEventListener(
    "click", () => {
        window.location.href = "/";
    }
);