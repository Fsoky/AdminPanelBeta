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


@app.post("/handle-action")
async def action_handler(data: dict):
    action = data.get("action")
    user_id = int(data.get("id"))
    query = {}

    if action == "new-balance":
        query["$inc"] = {"balance": int(data.get("amount"))}
    elif action == "new-status":
        query["$set"] = {"status": data.get("status")}
    else:
        return {"success": False}

    try:
        await db.users.update_one({"_id": user_id}, query)
        return {"success": True}
    except Exception as e:
        print(e) # lmao make logger pls.
        return {"success": False}



@app.get("/change-balance")
async def change_balance(request: Request):
    return templates.TemplateResponse("new_balance.html", {"request": request})


@app.get("/change-status")
async def change_status(request: Request):
    return templates.TemplateResponse("new_status.html", {"request": request})