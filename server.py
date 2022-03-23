from flask import Flask, jsonify, request, send_from_directory, send_file
import json

app = Flask(__name__)

@app.route('/api/senddata', methods=['POST'])
def index():
  payload = request.json
  pid = payload["id"]
  with open ('db/{}.json'.format(pid), 'w') as f:
    json.dump(payload, f, indent="  ")
  print(payload)
  return "Created: {} \n".format(payload)

@app.route('/')
def rootdir():
  return send_file('dist/index.html')

@app.route('/<path:path>')
def home(path):
  return send_from_directory('dist', path)

if __name__ == '__main__':
  app.run()