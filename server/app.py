from flask import Flask, render_template, request, jsonify
from flask import json
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from models import db, Todo
from flask_cors import CORS

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://todouser:sabrinalabruja@localhost:3306/todo_list"
db.init_app(app)
Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
CORS(app)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/todos/user/<username>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def tasks(username):
    if request.method == 'GET':
        todo = Todo.query.filter_by(username=username).first()
        if todo:
            return jsonify(json.loads(todo.tasks)), 200
        else:
            return jsonify({"msg": "Username doesn't exist"})

    if request.method == 'POST':
        print("entrando a post")
        tasks = request.get_json()
        todo = Todo.query.filter_by(username=username).first()

        if todo:
            return jsonify({"msg": "the username already exists"}), 401

        if not len(tasks) > 0:
            todo = Todo()
            todo.username = username
            todo.tasks = json.dumps(tasks)
            todo.save()
            return jsonify({"msg": "ok"}), 200

    if request.method == 'PUT':
        tasks = request.get_json()
        todo = Todo.query.filter_by(username=username).first()
        if todo:
            todo.tasks = json.dumps(tasks)
            todo.update()
            return jsonify({"msg": f"A list with {len(tasks)} todos was succesfully saved"}), 200
        else:
            return jsonify({"msg": "Username doesn't exist in our database"}), 400

    if request.method == 'DELETE':
        todo = Todo.query.filter_by(username=username).first()
        if todo:
            todo.delete()
            return jsonify({"msg": "ok"})
        else:
            return jsonify({"msg": "Username doesn't exist in our database"}), 400


if __name__ == '__main__':
    manager.run()
