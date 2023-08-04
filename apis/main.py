
from flask import Flask
from flask_cors import CORS
from deta import Deta

app = Flask(__name__)
CORS(
    app, 
    origins=["http://localhost:3000", "https://www.kmmanoj.me"]
)

@app.route('/v1/experience')
def experience():
    deta = Deta()
    db = deta.Base("experience")
    experiences = db.fetch()
    print(experiences)
    return experiences.items

@app.route('/v1/work')
def work():
    deta = Deta()
    db = deta.Base("work")
    work = db.fetch()
    return work.items

if __name__ == '__main__':
    app.run(debug=True)