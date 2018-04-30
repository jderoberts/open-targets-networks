import json
import sys

efo = sys.argv[1]

with open("../data/{}/stringdb/hotnet2/connected-output.json".format(efo),"r") as infile :
  stringdb_dict = json.load(infile)

with open("../data/{}/omnipath/hotnet2/connected-output.json".format(efo),"r") as infile :
  omnipath_dict = json.load(infile)

stringdb = "stringdb:"
for i in stringdb_dict['subnetworks'] :
    stringdb = stringdb + "\n" + str(len(i['nodes']))
omnipath = "omnipath:"
for i in omnipath_dict['subnetworks'] :
    omnipath = omnipath + "\n" + str(len(i['nodes']))

print stringdb
print omnipath
