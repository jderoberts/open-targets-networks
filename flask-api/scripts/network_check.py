import networkx as nx

source_network = nx.read_edgelist("../networks/stringdb/stringdbENSG.edgelist")

print len(source_network.nodes)
