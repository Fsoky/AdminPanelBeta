from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from motor.motor_asyncio import AsyncIOMotorClient
from aiogram import Bot

from config_reader import config

app = FastAPI()
templates = Jinja2Templates("web")

cluster = AsyncIOMotorClient(host="localhost", port=27017)
db = cluster.adminpaneldb

bot = Bot(config.TOKEN.get_secret_value())

app.mount("/static", StaticFiles(directory="web/static"), "static")


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/check-user")
async def check_user(data: dict):
    user = await db.users.count_documents({"_id": int(data.get("id"))})
    if user:
        return {"success": True}
    return {"success": False}


@app.get("/change-balance")
async def change_balance(request: Request):
    return templates.TemplateResponse("change_balance.html", {"request": request})


@app.post("/new-balance")
async def new_balance(data: dict):
    uid = int(data.get("id"))
    balance = int(data.get("balance"))

    try:
        await db.users.update_one({"_id": uid}, {"$inc": {"balance": balance}})
        await bot.send_message(
            uid, f"Вам изменили баланс: <code>{balance}</code> $", parse_mode="html"
        )
        return {"success": True}
    except:
        return {"success": False}