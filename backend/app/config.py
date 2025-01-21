from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    NBP_API_URL: str = "https://api.nbp.pl/api"


settings = Settings()
