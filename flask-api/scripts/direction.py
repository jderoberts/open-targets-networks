int_dict = {}
with open("../networks/omnipath/omnipathInteractions.txt","r") as intfile :
    for line in intfile.readlines():
        ints = line.rstrip().split('\t')
        int_dict[ints[0]+"-"+ints[1]] = [ints[2],ints[3],ints[4]]

source = "ENSG000000153113"
target = "ENSG000000162909"

print("expected: rev-dir")

if (source+"-"+target in int_dict) :
    print("FORWARD")
    type = int_dict[source+"-"+target]
    if (type[1] == "1" and type[2] == "1") :
        print( "dual")
    elif (type[1] == "1") :
        print( "activatory")
    elif (type[2] == "1") :
        print( "inhibitory")
    elif (type[0] == "1") :
        print( "directed")
elif (target+"-"+source in int_dict) :
    print("REV")
    type = int_dict[target+"-"+source]
    if (type[1] == "1" and type[2] == "1") :
        print( "rev-dual")
    elif (type[1] == "1") :
        print( "rev-activatory")
    elif (type[2] == "1") :
        print( "rev-inhibitory")
    elif (type[0] == "1") :
        print( "rev-directed")
