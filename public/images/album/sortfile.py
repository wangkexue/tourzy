import glob, json

def sortfile(files):
	file_lst = glob.glob(files)
	file_lst.sort()
	return file_lst

with open('imglist.json', 'w') as outfile:
  json.dump(sortfile('*.jpg'), outfile)