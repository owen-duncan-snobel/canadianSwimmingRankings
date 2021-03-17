import pandas as pd
import json

from .file_paths import BASE_PATH

def get_swimmers_data(gender,agegroup,course,season,clubId,Points,Language):
    
    # Dictonary of all the df (Each df is an event for the specified query parameters)
    dict_of_df = pd.read_excel(BASE_PATH.format(gender=gender,agegroup=agegroup,course=course,season=season,clubId=clubId,Points=Points,Language=Language), engine='xlrd', sheet_name=None, skiprows=1)

    for key in dict_of_df.keys():
        dict_of_df[key] = dict_of_df[key].fillna(0)

    # convert dataframes into dictionaries
    data_dict = {
        key: dict_of_df[key].to_dict(orient='records')
        for key in dict_of_df.keys()
    }

    return data_dict