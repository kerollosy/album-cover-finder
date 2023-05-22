from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/album')
def fetch_album():
    album_name = request.args.get('album_name', '')

    api_url = f'https://itunes.apple.com/search?term={album_name}&country=US&media=music&entity=album&limit=1'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return 'Error retrieving album artwork.', 500

if __name__ == '__main__':
    app.run()

