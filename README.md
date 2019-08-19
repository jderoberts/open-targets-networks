# Open Targets: Subnetworks
Systematic disease associated network detection and visualisation using the Open Targets platform.

![Homepage screenshot](/docs/OTN_home.png)

## Motivation:
Understanding the network context of associations between genes and diseases is a critical aspect of drug target selection. Defining networks of genes associated with a given disease instead of isolated, individual genes increases confidence in the association, helps build a therapeutic hypothesis and allows the selection of the most effective drug targets.

## Technologies:
- Node.js (v.10.16.0)
- Angular (v.8.1.2)
- MDB for Angular (v.8.1.0)
- Elasticsearch (v.7.1.0)
- Python modules:
  - Flask (v1.0.2)
  - python-igraph (v0.7.1)
  - opentargets (v3.1.0)
  - chembl_webresource_client (v0.9.31)
- Node.js modules:
  - D3 (v5.9.7)
  - d3-tip (v0.9.1)
  - Elasticsearch browser client (v.16.3.0)

![Application structure](/docs/application_structure.png)

## Application:
The Python application backend maps disease association scores onto networks of interacting proteins, then uses the HotNet2 heat diffusion algorithm to find subnetworks of interacting disease genes.  These networks are displayed to the user through an Angular interface as interactive D3.js force-directed graphs, and are annotated with currently available drugs targeting the proteins discovered.

![Disease summary](/docs/disease_summary.png)

![Subnetwork visualisation](/docs/subnetworks.png)

![Subnetwork drugs](/docs/subnetwork_drugs.png)

## Data Sources:
[Open Targets platform](https://www.opentargets.org/)
[Experimental Factor Ontology](https://www.ebi.ac.uk/efo/)
[STRING](https://string-db.org/)
[OmniPath](http://omnipathdb.org/)
[ChEMBL](https://www.ebi.ac.uk/chembl/)

## Setup:
To run the application using the webpack dev server:
1. Install dependencies (Node.js, Angular CLI etc.)
2. Clone the repository
3. Start dev server:
    *`cd open-targets-networks/`
    *`npm start &`
4. Start flask backend:
    *`cd ../flask-api/`
    *`python app.py &`
5. Open your browser at http://localhost:4200/

The application expects an Elasticsearch instance running at http://localhost:9200/ with an index titled 'efo'. Use the shell scripts included in the [efo-elastic-app/EFO-data](https://github.com/jderoberts/EFO-Elastic-app/tree/master/EFO-data) folder to create the index and populate it with the processed EFO data.

## Acknowledgements
My thanks to Jean-Marc Schwartz, Alex Gutteridge and the Open Targets team at GSK.

---
# Updates 2019 - V2
- Updated to Angular 8
- Switched from Http to HttpClient
- Standardised component, service and interface naming
- Refactored larger components - drugs table, node information split to their own components.
- Added Elasticsearch implementation from [efo-elastic-app](https://github.com/jderoberts/EFO-Elastic-app)
