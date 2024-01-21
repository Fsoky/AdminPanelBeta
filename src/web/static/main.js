let tg = window.Telegram.WebApp;
tg.headerColor = "#9538ec";

export async function fetchData(url, data) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export function showSnackBar(text) {
    let snackbar = document.querySelector(".snackbar");

    snackbar.style.display = "flex";
    snackbar.textContent = text;
    setTimeout(() => {snackbar.style.display = "none"}, 3000);
}