import asyncio
from contextlib import suppress

from aiogram import Router, Bot, Dispatcher, F
from aiogram.types import Message, WebAppInfo
from aiogram.filters import CommandStart, Command
from aiogram.enums import ParseMode
from aiogram.utils.keyboard import InlineKeyboardBuilder

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError

from config_reader import config


router = Router()
router.message.filter(F.from_user.id == config.ADMIN_ID)


def inline_builder():
    builder = InlineKeyboardBuilder()
    builder.button(text="Admin Panel", web_app=WebAppInfo(url=config.NGROK_LINK.get_secret_value()))
    return builder.as_markup()

@router.message(CommandStart())
async def start(message: Message, db) -> None:
    with suppress(DuplicateKeyError):
        await db.users.insert_one({
            "_id": message.from_user.id,
            "balance": 0,
            "status": "Hello, world!"
        })
    await message.answer("Hello")


@router.message(Command("admin"))
async def admin(message):
    await message.reply("Hello!", reply_markup=inline_builder())


async def main() -> None:
    bot = Bot(config.TOKEN.get_secret_value(), parse_mode=ParseMode.HTML)
    dp = Dispatcher()

    cluster = AsyncIOMotorClient(host="localhost", port=27017)
    db = cluster.adminpaneldb

    dp.include_router(router)

    await bot.delete_webhook(True)
    await dp.start_polling(bot, db=db)


if __name__ == "__main__":
    asyncio.run(main())