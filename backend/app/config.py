from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    NBP_API_URL: str = "https://api.nbp.pl/api"


settings = Settings()
