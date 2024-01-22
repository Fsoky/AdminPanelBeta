let tg = window.Telegram.WebApp;
tg.headerColor = "#9538ec";

export async function fetchData(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authentication: window.Telegram.WebApp.initData,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      showSnackBar("❌ Не авторизован!");
    }

    console.error("Error:", error);
    throw error;
  }
}

export function showSnackBar(text) {
  let snackbar = document.querySelector(".snackbar");

  snackbar.style.display = "flex";
  snackbar.textContent = text;
  setTimeout(() => {
    snackbar.style.display = "none";
  }, 3000);
}
