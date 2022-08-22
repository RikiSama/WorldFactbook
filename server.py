from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "riki was here"
    
app.run(debug=True)