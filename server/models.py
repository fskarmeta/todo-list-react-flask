from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from sqlalchemy.sql.schema import ForeignKey
db = SQLAlchemy()


class Todo(db.Model):
    __tablename__ = 'todo'
    username = db.Column(db.String(100), unique=True, primary_key=True)
    tasks = db.Column(db.String(1000))

    def serialize(self):
        return self.tasks

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
