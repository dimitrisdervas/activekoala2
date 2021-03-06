import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pathlib import Path
import pandas as pd
import os

dirPath = "csv/google/"
fileList = os.listdir(dirPath)
for fileName in fileList:
 os.remove(dirPath+"/"+fileName)

# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)


scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
schools = client.open_by_key("1-DwJZAfWU_ChYNP8KQ7uG45Bf_5Pp5iZ6R3NfwG11KA").get_worksheet(0)
categories = client.open_by_key("1-DwJZAfWU_ChYNP8KQ7uG45Bf_5Pp5iZ6R3NfwG11KA").get_worksheet(1)
subcategories = client.open_by_key("1-DwJZAfWU_ChYNP8KQ7uG45Bf_5Pp5iZ6R3NfwG11KA").get_worksheet(2)
organisations = client.open_by_key("1-DwJZAfWU_ChYNP8KQ7uG45Bf_5Pp5iZ6R3NfwG11KA").get_worksheet(3)


# Extract all of the records for each row.
schools_data = schools.get_all_records()
schools_data = pd.DataFrame(schools_data)
schools_data.to_csv('csv/google/schools.csv')

# Extract all of the records for each row.
organisations_data = organisations.get_all_records()
organisations_data = pd.DataFrame(organisations_data)
organisations_data.to_csv('csv/google/organisations.csv')

# Extract all of the records for each row.
subcategories_data = subcategories.get_all_records()
subcategories_data = pd.DataFrame(subcategories_data)
subcategories_data.to_csv('csv/google/subcategories.csv')

# Extract all of the records for each row.
categories_data = categories.get_all_records()
categories_data = pd.DataFrame(categories_data)
categories_data.to_csv('csv/google/categories.csv')


