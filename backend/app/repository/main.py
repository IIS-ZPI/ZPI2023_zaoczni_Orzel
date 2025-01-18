from sqlmodel import create_engine, text
from sqlalchemy.ext.asyncio import AsyncEngine
from app.config import settings

engine = create_engine(
    create_engine (
            url=settings.DATABASE_URL,
            echo=True
    )
)

async def init_repository():
    async with engine.begin() as conn:
        statement = text("SELECT 'hello';")
        
        result = await conn.execute(statement)
        
        print(result.all())