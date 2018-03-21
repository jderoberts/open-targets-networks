#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 27 20:35:23 2018

@author: jr553
"""
import pandas as pd
from opentargets import OpenTargetsClient

def simple_heatfile(disease) :
    """
    Output tab-separated ENSG and assoc scores for nodes with non-zero assoc scores
    
    disease = disease of interest (EFO code)
    """
    ot = OpenTargetsClient()
    all_associations = ot.filter_associations(disease = disease)
    with open('../heatfiles/heatfile','w') as outfile:
        for i, r in enumerate(all_associations):
            outfile.write("{} {}\n".format(r['target']['id'], r['association_score']['overall']))

def full_heatfile(disease, network) :
    """
    Output tab-separated ENSG and assoc scores for all nodes
    in network, including zero values.  Not needed?
    
    disease = disease of interest (EFO code)
    network = source network (stringdb or omnipath)
    """
    #Read in network info frame
    idFrame = pd.read_csv('../networks/'+network+'IDFrame.csv')
    idFrame = idFrame.set_index('geneID')    
    ot = OpenTargetsClient()
    all_associations = ot.filter_associations(disease = disease)
    #build frame of associations
    assocFrame = pd.DataFrame(columns=['geneID','score'])
    for i, r in enumerate(all_associations):
        assocFrame.loc[len(assocFrame)] = [r['target']['id'], r['association_score']['overall']]
    #Join with sample data
    idFrame = idFrame.join(assocFrame.set_index('geneID'), how='left').fillna(0)    
    #Output to heatfile
    with open('../heatfiles/heatfile','w') as outfile:
        for index, row in idFrame.iterrows():
            if isinstance(index, basestring):
                outfile.write("{} {}\n".format(index,row['score']))
                
def ot_version() :
    ot = OpenTargetsClient()
    stats = ot.get_stats()
    return str(stats.info['data_version'])