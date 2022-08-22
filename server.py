from flask import Flask,render_template
import json

w = json.load(open("worldl.json"))
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", allCountries = w)

@app.route("/country/<n>")
def country(n):
    return render_template("country.html", country=w[int(n)])
app.run(debug=True)