from flask import Flask, jsonify, abort
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

#get disease-network-algorithm version file
@app.route("/version/<disease>/<network>/<algorithm>")
def get_version_file(disease,network,algorithm):
    json_data = "{}"
    try :
        with open('data/{}/{}/{}/version.json'.format(disease,network,algorithm)) as json_file:
            json_data = json.load(json_file)
    except IOError :
        abort(404, "version file not found")
    return jsonify(json_data)

#get disease-network-algorithm result file
@app.route("/subn/<disease>/<network>/<algorithm>")
def get_result_file(disease,network,algorithm):
    json_data = "{}"
    try :
        with open('data/{}/{}/{}/connected-output.json'.format(disease,network,algorithm)) as json_file:
            json_data = json.load(json_file)
    except IOError :
        abort(404, "results file not found")
    return jsonify(json_data)

#add requested run to queue - no duplicates permitted
@app.route("/queue/<disease>/<network>/<algorithm>")
def queue_run(disease,network,algorithm):
    request = '{} {} {}\n'.format(disease,network,algorithm)
    with open('queue.txt','r+') as queue :
        for line in queue.readlines() :
            if (line == request) :
                return '{"message":"Already queued"}', 200
        queue.write(request)
        return '{"message":"Added to queue"}',201

#search and return simple text result - test func
@app.route("/search/<disease>")
def search_item(disease):
    request = 'Requested disease code: {}'.format(disease)
    return '{"message":"'+request+'"}'
    

if __name__ == '__main__' :
    app.run(debug=True)

