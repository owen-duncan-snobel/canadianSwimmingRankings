from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None


@app.get("/swimmers/{}")
async def get_swimmers():
    return {"Hello": "World"}

@app.get("/clubs/{}")
async def get_swimmers():
    return {"Hello": "World"}


    #    https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us