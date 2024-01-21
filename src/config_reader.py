from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr


class Settings(BaseSettings):
    ADMIN_ID: int = 1490170564 # use ur ID
    TOKEN: SecretStr
    NGROK_LINK: SecretStr

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


config = Settings()