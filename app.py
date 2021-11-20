from flask import Flask, render_template
from flask.helpers import url_for, send_from_directory

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/static/<filename>")
def static_route(filename):
    return send_from_directory('static', filename)