import pandas as pd
import json

from .file_paths import BASE_PATH


def get_swimmers_data(gender,agegroup,course,season,clubId,Points,Language,compare):
    
    # Create a dictionary of all the the seasons wishing to be compared
    data_dict_all = []
    year = None
    for i in range(compare):
        # 2008 is the earliest recorded season
        if season-i < 2008: break

        # Dictonary of all the df (Each df is an event for the specified query parameters)
        dict_of_df = pd.read_excel(BASE_PATH.format(gender=gender,agegroup=agegroup,course=course,season=season-i,clubId=clubId,Points=Points,Language=Language), engine='xlrd', sheet_name=None, skiprows=1)
        for key in dict_of_df.keys():
            dict_of_df[key] = dict_of_df[key].fillna(0)

        # convert dataframes into dictionaries
        data_dict = {
            key: dict_of_df[key].to_dict(orient='records') for key in dict_of_df
        }
        data_dict['year'] = season-i
        data_dict_all.append(data_dict)
 
    return data_dict_all


def get_clubs_data(gender,agegroup,course,season,clubId,Points,Language):
    
    # Dictonary of all the df (Each df is an event for the specified query parameters)
    dict_of_df = pd.read_excel(BASE_PATH.format(gender=gender,agegroup=agegroup,course=course,season=season,clubId=clubId,Points=Points,Language=Language), engine='xlrd', sheet_name=None, skiprows=1)

    for key in dict_of_df.keys():
        dict_of_df[key] = dict_of_df[key].fillna(0)

    # convert dataframes into dictionaries
    data_dict = {
        key: dict_of_df[key].to_dict(orient='records')
        for key in dict_of_df
    }

    return data_dict


