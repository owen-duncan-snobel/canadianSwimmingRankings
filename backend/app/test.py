import pandas as pd
base_url = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008' \
           '&clubId=72542&Points=fina_2019&Language=us '
df = pd.read_excel(base_url, engine='xlrd', sheet_name="50m Fr", skiprows=1)
json_str = df.to_json('ALL.json', orient='records')

