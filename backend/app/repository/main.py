from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncEngine
import ssl

from app.config import settings

# SSL context for secure connections
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

engine: AsyncEngine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,
    connect_args={"ssl": ssl_context}  # Add SSL context here
)

async def init_repository():
    async with engine.begin() as conn:
        result = await conn.execute(text("SELECT 'hello';"))
        print(result.all())
