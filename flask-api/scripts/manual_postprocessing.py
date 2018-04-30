#!/usr/bin/env python2
# -*- coding: utf-8 -*-

#for testing changes to the post-processing on existing hotnet2 results.
#hardcode the efo and network and run in flask-api/scripts

import json
import networkx as nx
from chembl_webresource_client.new_client import new_client

def generateOutput(efo, ntwk) :

    print("Generating output for {}-{}".format(efo,ntwk))

    #load original graph object into networkx object for path retrieval
    #"./networks/{}.edgelist".format(ntwk)
    source_network = nx.read_edgelist("../networks/{}/{}ENSG.edgelist".format(ntwk,ntwk))

    #ENSG id -> gene name mapping
    name_dict = {}
    #with open("./networks/{}DisplayName.txt".format(ntwk),"r") as namefile :
    with open("../networks/{}/{}DisplayName.txt".format(ntwk,ntwk),"r") as namefile :
        for line in namefile.readlines():
            codes = line.rstrip().split('\t')
            name_dict[codes[0]] = codes[1]

    #Interaction type for OmniPath data
    if (ntwk == "omnipath") :
        int_dict = {}
        with open("../networks/omnipath/omnipathInteractions.txt","r") as intfile :
            for line in intfile.readlines():
                ints = line.rstrip().split('\t')
                int_dict[ints[0]+"-"+ints[1]] = [ints[2],ints[3],ints[4]]

    #load data for run and extract relevant portion
    with open("../data/{}/{}/hotnet2/{}-score/viz-data.json".format(efo, ntwk, ntwk),"r") as infile:
        viz_dict = json.load(infile)
    auto_delta = str(viz_dict["params"]["auto_delta"])
    subnetworks = viz_dict["subnetworks"][auto_delta]

    output_dict = {"subnetworks" : [],
                   "auto_delta" : str(auto_delta)}

    print("\tprocessing subnetworks...")

    for network in subnetworks :
        #skip networks below length threshold
        if len(network["nodes"]) < 3:
            next
        else :
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
                #add edge interaction type if omnipath
                if (ntwk == "omnipath") :
                    if (edge["source"]+"-"+edge["target"] in int_dict) :
                        type = int_dict[edge["source"]+"-"+edge["target"]]
                        if (type[1] == "1" and type[2] == "1") :
                            link["type"] = "dual"
                        elif (type[1] == "1") :
                            link["type"] = "stimulatory"
                        elif (type[2] == "1") :
                            link["type"] = "inhibitory"
                        elif (type[0] == "1") :
                            link["type"] = "directed"
                    if (edge["target"]+"-"+edge["source"] in int_dict) :
                        type = int_dict[edge["target"]+"-"+edge["source"]]
                        if (type[1] == "1" and type[2] == "1") :
                            link["reverse"] = "rev-dual"
                        elif (type[1] == "1") :
                            link["reverse"] = "rev-stimulatory"
                        elif (type[2] == "1") :
                            link["reverse"] = "rev-inhibitory"
                        elif (type[0] == "1") :
                            link["reverse"] = "rev-directed"
                subn["links"].append(link)
            #ensure subnetwork is connected
            print("\tconnecting output...")
            core = []
            outliers = []
            linkers = []
            components = sorted(nx.connected_component_subgraphs(sub_graph), key=len, reverse=True)
            for i, sg in enumerate(components):
                if (i == 0 ):
                    core = [n for n in sg.nodes]
                else :
                    outliers.extend([n for n in sg.nodes])
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
                            if (step[1] not in outliers) :
                                nd = {"id" : step[1],
                                      "label" : name_dict[step[1]],
                                      "assoc" : 0}
                                subn["nodes"].append(nd)
                            link = {"source" : step[0],
                                    "target" : step[1],
                                    "type" : "manual"}
                            subn["links"].append(link)
                        break #break after first path
            #subnetwork now complete and connected
            #add summary info + add to output
            subn["size"] = len(subn["nodes"])
            subn["heat"] = total_heat/subn["size"]
            output_dict["subnetworks"].append(subn)

    #now look up drugs for each subn
    uniprotDict = {}
    with open("../networks/{}/{}Uniprot.txt".format(ntwk,ntwk),"r") as infile:
        for line in infile:
            ids = line.rstrip().split("\t")
            uniprotDict[ids[0]] = ids[1]

    print("\tadding drugs...")

    for subn in output_dict['subnetworks']:
        subn['drugs'], subn['diseases'] = getDrugs(subn, uniprotDict);

    with open("../data/{}/{}/hotnet2/connected-output.json".format(efo, ntwk),"w") as outfile :
        json.dump(output_dict, outfile)

def getDrugs(subn, uniP) :
    subn_drugs = []
    subn_diseases = []
    for nd in subn['nodes'] :
        try:
            uniprot = uniP[nd['id']]
        except:
            next  #skip if uniprot mapping not possible
        target_records = new_client.target.filter(target_components__accession=uniprot)
        target_chemblids = [x['target_chembl_id'] for x in target_records]
        #pull out list of drugs associated with each chemblid
        for target in target_chemblids :
            activities = new_client.mechanism.filter(target_chembl_id=target)
            compound_ids = [x['molecule_chembl_id'] for x in activities]
            #approved_drugs = new_client.molecule.filter(molecule_chembl_id__in=compound_ids).filter(max_phase=4)
            all_drugs = new_client.molecule.filter(molecule_chembl_id__in=compound_ids).filter(max_phase_gte=1)
            #skip to next if no approved drugs
            if (not all_drugs) :
                next
            #for each drug get info and append to list
            for drug in all_drugs :
                for compound in subn_drugs :
                    if drug['pref_name'] == compound['name'] :
                        #if drug info already in list add current gene as another target
                        #and add mechanism if not already added
                        #make sure not already added for same gene, different chemblid
                        if (nd['label'] not in compound['genes']):
                            compound['genes'].append(nd['label'])
                        drugmech = new_client.mechanism.filter(molecule_chembl_id=drug['molecule_chembl_id']).filter(target_chembl_id=target)[0]
                        if (drugmech['mechanism_of_action'] not in compound['mechanisms']) :
                            compound['mechanisms'].append(drugmech['mechanism_of_action'])
                        break
                else :
                    drugItem = {"name" : drug['pref_name'],
                                "url" : "https://www.ebi.ac.uk/chembl/compound/inspect/"+drug['molecule_chembl_id'],
                                "type":drug['molecule_type'],
                                "max_phase" : drug['max_phase'],
                                "genes" : [nd['label']],
                                "indications" : [],
                                "diseases" : [],
                                "mechanisms" : []}
                    #now look up disease indications for the drug
                    indications = new_client.drug_indication.filter(molecule_chembl_id=drug['molecule_chembl_id'])
                    #indications_response = requests.get("https://www.ebi.ac.uk/chembl/api/data/drug_indication?molecule_chembl_id={}&format=json".format(drug['molecule_chembl_id']))
                    #indications = indications_response.json()['drug_indications']
                    for ind in indications :
                        disease = {"efo_term" : ind['efo_term'],
                                   "stage" : ind['max_phase_for_ind']}
                        if (disease['efo_term'] is not None and disease['efo_term']) :
                            drugItem['indications'].append(disease)
                            if (disease['efo_term'] not in subn_diseases) :
                                subn_diseases.append(disease['efo_term'])
                            if (disease['efo_term'] not in drugItem['diseases']) :
                                drugItem['diseases'].append(disease['efo_term'])
                    drugItem['indications'] = sorted(drugItem['indications'], key=lambda d: d['stage'], reverse=True)
                    #now get mechanism for drug
                    drugmech = new_client.mechanism.filter(molecule_chembl_id=drug['molecule_chembl_id']).filter(target_chembl_id=target)[0]
                    drugItem['mechanisms'].append(drugmech['mechanism_of_action'])
                    subn_drugs.append(drugItem)
    #sort output by number of indications
    subn_drugs = sorted(subn_drugs, key=lambda d: len(d['indications']), reverse=True)
    return (subn_drugs, subn_diseases)


manual_diseases = ["EFO_0004208","EFO_0005297","EFO_0003780","EFO_0007292","EFO_0007460"]
manual_network = ["omnipath"]

all_diseases = ["EFO_0000249","EFO_0000270","EFO_0000274","EFO_0000341",
"EFO_0000373","EFO_0000384","EFO_0000401","EFO_0000676",
"EFO_0000685","EFO_0000699","EFO_0000717","EFO_0000729",
"EFO_0000756","EFO_0001060","EFO_0001359","EFO_0002506",
"EFO_0002508","EFO_0002689","EFO_0002690","EFO_0003767",
"EFO_0003780","EFO_0003834","EFO_0003843","EFO_0003885",
"EFO_0003894","EFO_0004208","EFO_0004826","EFO_0004991",
"EFO_0005297","EFO_0005676","EFO_0005761","EFO_0005762",
"EFO_0005772","EFO_0005846","EFO_0006812","EFO_0007292",
"EFO_0007460","EFO_1000653","EFO_1000760",
"EFO_1001249","EFO_1001316","EFO_1001496"]

for p in manual_network :
    for q in all_diseases :
        if q < "EFO_0001000" :
            continue
        if q not in manual_diseases :
            generateOutput(q, p)
