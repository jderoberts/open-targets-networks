#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  5 17:53:23 2018

@author: jr553
"""

import json
import networkx as nx



#load original graph object into networkx object for path retrieval
#"./networks/{}.edgelist".format(ntwk)
source_network = nx.read_edgelist("../networks/stringdb/stringdbENSG.edgelist")

#ENSG id -> gene name mapping
name_dict = {}
with open("../networks/stringdb/stringdbDisplayName.txt","r") as namefile :
     for line in namefile.readlines():
        codes = line.rstrip().split('\t')
        name_dict[codes[0]] = codes[1]

with open("../data/EFO_0002690/stringdb//hotnet2/stringdb-score/viz-data.json","r") as infile:
    viz_dict = json.load(infile)
auto_delta = str(viz_dict["params"]["auto_delta"])
subnetworks = viz_dict["subnetworks"][auto_delta]

def subnetw() :
    output_dict = {"subnetworks" : [],
                   "auto_delta" : str(auto_delta)}
    x = 1
    for network in subnetworks :
        #skip networks below length threshold
        if len(network["nodes"]) < 3:
            next
        if x != 1 :
            x += 1
            next
        else :
            x += 1
            print "Subnetwork 1:"
            print "Nodes:"
            print network["nodes"]
            #generate new networkx for singleton detection 
            sub_graph = nx.Graph()
            total_heat = 0
            subn = {"nodes": [],
                    "links": [],
                    "size" : "",
                    "heat" : ""}
            for node in network["nodes"] :
                #add to nx
                sub_graph.add_node(node["name"])
                #build json representation
                nd = {"id" : node["name"],
                      "label" : name_dict[node["name"]],
                      "assoc" : node["value"]}
                subn["nodes"].append(nd)
                total_heat += float(node["value"])
            for edge in network["edges"] :
                #add to nx
                sub_graph.add_edge(edge["source"],edge["target"])
                #build json representation
                link = {"source" : edge["source"],
                        "target" : edge["target"]}
            #ensure subnetwork is connected
            core = []
            outliers = []
            linkers = []
            components = sorted(nx.connected_component_subgraphs(sub_graph), key=len, reverse=True)
            print "################\nComponents:"
            for i, sg in enumerate(components):
                if (i == 0 ):
                    core = [n for n in sg.nodes]
                else :
                    print "outlier component: ", [n for n in sg.nodes]
                    outliers.extend([n for n in sg.nodes])
            print "core: ", core
            print "outliers: ", outliers
            for source in outliers :
                for target in core :
                    paths = nx.all_shortest_paths(source_network,source,target)
                    for path in paths :
                        for i in range(0,len(path)):
                            step = path[i:i+2]
                            if (step[1] in core or step[1] in linkers):
                                link = {"source" : step[0],
                                    "target" : step[1],
                                    "type" : "manual"}
                                if (link not in subn["links"]) :
                                    subn["links"].append(link)
                                break
                            linkers.append(step[1])
                            if ( step[1] not in outliers ) :
                                nd = {"id" : step[1],
                                      "label" : name_dict[step[1]],
                                      "assoc" : 0}
                                subn["nodes"].append(nd)
                            link = {"source" : step[0],
                                    "target" : step[1],
                                    "type" : "manual"}
                            subn["links"].append(link)
            #subnetwork now complete and connected
            #add summary info + add to output
            subn["size"] = len(subn["nodes"])
            subn["heat"] = total_heat/subn["size"]
            output_dict["subnetworks"].append(subn)

subnetw()
