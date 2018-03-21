#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 27 20:28:50 2018

@author: jr553
"""
import argparse
import os
import sys
sys.path.append("hotnet2")
import HotNet2
import ot_heats
import makeHeatFile

#%%Argparser
help_text = "Produce heatfiles for given network from Open Targets disease association data.\n\n"
note = "Author: James Roberts <james.roberts-6@postgrad.manchester.ac.uk>"
parser = argparse.ArgumentParser(description=help_text, epilog=note, formatter_class=argparse.RawTextHelpFormatter)
parser.add_argument(
    '-d',
    '--disease',
    dest='disease',
    action='store',
    required=True,
    type=str,
    help='disease of interest (EFO code)',
    metavar='EFOx'
)
parser.add_argument(
    '-n',
    '--network',
    dest='network',
    action='store',
    type=str.lower,
    default='stringdb',
    choices = ['stringdb','omnipath'],
    help='source network (stringdb or omnipath)',
    metavar='ntwk'
)
arguments = parser.parse_args()
#%% generate directory structure for parameters given
hierarchy='/home/jr553/open-targets-networks/flask-api/data/{}/{}/hotnet2'.format(arguments.disease,arguments.network)

if not os.path.isdir(hierarchy):
    os.makedirs(hierarchy)
#%% record ot data version at time of heatfile generation
ot_v = ot_heats.ot_version()
with open(hierarchy+'/version.json','w') as vfile :
    vfile.write('{"version":'+'"{}"'.format(ot_v)+'}')
        
#%% generate heatfile for given EFO disease code
ot_heats.simple_heatfile(arguments.disease)

#%% convert to heats json
makeHeatFile.run(makeHeatFile.get_parser().parse_args(
        ['scores',
         '-hf','../heatfiles/heatfile',
         '-o','../heatfiles/heatfile.json',
         '-n','score']))
"""
#%% make output dir and run HotNet2 algorithm
HotNet2.run(HotNet2.get_parser().parse_args(
        ['-nf','../networks/{}/{}_ppr_0.45.h5'.format(arguments.network,arguments.network),
         '-pnp','../networks/{}/permuted/{}_ppr_0.45_##NUM##.h5'.format(arguments.network,arguments.network),
         '-hf','../heatfiles/heatfile.json',
         '-np','5','-hp','1000',
         '-o','../data/{}/{}/hotnet2'.format(arguments.disease,arguments.network),
         '-c','-1'
         ]))
"""