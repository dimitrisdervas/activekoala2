import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pathlib import Path
import pandas as pd


# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)
 
# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet1 = client.open_by_key("1b50PZ60dxLpcu-Rz4lWo3xO_9CSRlb3EhKY92l_STwM").sheet1
sheet2 = client.open_by_key("1b50PZ60dxLpcu-Rz4lWo3xO_9CSRlb3EhKY92l_STwM").get_worksheet(2)

# Extract all of the records for each row.
your_data1 = sheet1.get_all_records()
your_data1 = pd.DataFrame(your_data1)
your_data1.to_csv('google/schools.csv')

# Extract all of the records for each row.
your_data2 = sheet2.get_all_records()
your_data2 = pd.DataFrame(your_data2)
your_data2.to_csv('google/courses.csv')



