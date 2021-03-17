import pandas as pd
import json

'''
    DATA SCHEMA
    data = {
         "event": [
            {
                "COURSE": string,
                "GENDER": string,
                "DISTANCE": integer,
                "STROKE": string,
                "FULLNAME": string,
                "BIRTHDATE": time_stamp,
                "NATION": string,
                "CLUBCODE": string,
                "SWIMTIME": float,
                "SWIMTIME_N": string,
                "PTS_FINA": integer,
                "PTS_RUDOLPH": float,
                "PLACE": integer,
                "MEETDATE": time_stamp,
                "MEETCITY": string,
                "MEETNAME": string,
                "CLUBNAME": string
            },
        ]
    }
'''

base_url = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008' \
           '&clubId=72542&Points=fina_2019&Language=us '
dict_of_df = pd.read_excel(base_url, engine='xlrd', sheet_name=None, skiprows=1)

for key in dict_of_df.keys():
    dict_of_df[key] = dict_of_df[key].fillna(0)

# convert dataframes into dictionaries
data_dict = {
    key: dict_of_df[key].to_dict(orient='records')
    for key in dict_of_df.keys()
}

# write to disk
with open('data_dict.json', 'w') as fp:
    json.dump(
        data_dict,
        fp,
        indent=4,
        default=str
    )

##json_str = df.to_json('ALL.json', orient='records')
