from utils.get_data import get_swimmers_data, get_clubs_data
from typing import Optional

from pydantic import BaseModel
from fastapi import BackgroundTasks, HTTPException, FastAPI, Query

app = FastAPI()


"""
Which Would give us the Excel File with the following Parameters: 
- Gender : Male
- Age Group: Open
- Course: Long Course Metres
- Season : 2008
- Club : Oakville Aquatic Club
- Points : Fina 2019 Scoring
- Language : English

https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us
"""

@app.get("/swimmers")
async def get_swimmers(gender:str, course:str, clubId:int, Points:Optional[str] = None, Language:Optional[str] = 'us', agegroup: str = 'X_X', compare: int = 1, season: int = Query(..., gt=2007)):
    try:
        data = get_swimmers_data(gender, agegroup, course, season, clubId, Points, Language, compare)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")
    return data

@app.get("/clubs")
async def get_clubs(gender:str, course:str, clubId:int, Points:Optional[str] = None, Language:Optional[str] = 'us', agegroup: str = 'X_X', season: int = Query(..., gt=2007)):
    try:
        data = get_clubs_data(gender,agegroup,course,season,clubId,Points,Language)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")
    return data

    #    https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us