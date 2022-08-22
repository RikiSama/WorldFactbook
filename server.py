from flask import Flask,render_template
import json

w = json.load(open("worldl.json"))
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

app.run(debug=True)