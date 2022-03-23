from flask import Flask, jsonify, request, send_from_directory, send_file
import json
import csv
app = Flask(__name__)

@app.route('/api/senddata', methods=['POST'])
def index():
  payload = request.json
  pid = payload["id"]
  for question in payload["questions"]:
    print(question)
    for i in range(len(question["options"])):
      print(i)
      print(question["options"])
      print(question["options"][i])
      question["option{}".format(i+1)] = question["options"][i]
    del question["options"]
      
    question["correct"] = question["correct"][0]
    question["answer"] = question["answers"][0]
    del question["answers"]
  
  with open ('db/{}.csv'.format(pid), 'w') as f:
    csv_writer = csv.writer(f)
    header = payload["metadata"].keys()
    csv_writer.writerow(header)
    csv_writer.writerow(payload["metadata"].values())
    csv_writer.writerow([])
    csv_writer.writerow(payload["questions"][0].keys())
    for q in payload["questions"]:
      csv_writer.writerow(q.values())
    
  with open ('db/{}.json'.format(pid), 'w') as f:
    json.dump(payload, f, indent="")
  print(payload)
  return "Created: {} \n".format(payload)

@app.route('/')
def rootdir():
  return send_file('dist/index.html')

@app.route('/<path:path>')
def home(path):
  return send_from_directory('dist', path)

if __name__ == '__main__':
  app.run(host="0.0.0.0", port="80")