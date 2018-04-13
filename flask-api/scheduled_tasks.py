#!/home/jde_roberts3/anaconda2/bin/python

import os

api_home = "/home/jde_roberts3/open-targets-networks/flask-api/"
jobs = []

with open(api_home+'queue.txt','r') as queue :
    for line in queue :
        if line == "\n" : continue
        params = line.rstrip().split(' ')
        jobs.append((params[0],params[1],params[2]))
#%% for each result where hotnet2 : 
for job in jobs :
    if job[2] == "hotnet2":
        print "{}-{} scheduled for hotnet2".format(job[0],job[1])
        os.system('python {}scripts/ot_hotnet2.py -d {} -n {}'.format(api_home, job[0], job[1]))

#empty queue file
with open(api_home+'queue.txt', 'w') as queue:
    pass
