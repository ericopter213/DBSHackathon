from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost/dbshack'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

# Create tables
db.create_all()

# Routes
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data["username"]
    password = data["password"]

    existing_user = User.query.filter_by(username=username).first()

    if existing_user:
        return jsonify({"message": "Username already exists"}), 409

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username, password=password).first()

    if not user:
        return jsonify({"message": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful"}), 200

@app.route("/addtransaction", methods=["POST"])
def add_transaction():
    data = request.json
    description = data["description"]
    amount = data["amount"]
    date = data.get("date", datetime.utcnow())

    new_transaction = Transaction(description=description, amount=amount, date=date)
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Transaction created successfully"}), 201

@app.route("/", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([{"id": t.id, "description": t.description, "amount": t.amount, "date": t.date} for t in transactions]), 200

@app.route("/transactions/<int:transaction_id>", methods=["GET"])
def get_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    return jsonify({"id": transaction.id, "description": transaction.description, "amount": transaction.amount, "date": transaction.date}), 200

@app.route("/transactions/<int:transaction_id>", methods=["PUT"])
def update_transaction(transaction_id):
    data = request.json
    description = data["description"]
    amount = data["amount"]
    date = data.get("date", datetime.utcnow())

    updated_transaction = Transaction.query.get(transaction_id)

    if not updated_transaction:
        return jsonify({"message": "Transaction not found"}), 404

    updated_transaction.description = description
    updated_transaction.amount = amount
    updated_transaction.date = date

    db.session.commit()

    return jsonify({"message": "Transaction updated successfully"}), 200

@app.route("/transactions/<int:transaction_id>", methods=["DELETE"])
def delete_transaction(transaction_id):
    deleted_transaction = Transaction.query.get(transaction_id)

    if not deleted_transaction:
        return jsonify({"message": "Transaction not found"}), 404

    db.session.delete(deleted_transaction)
    db.session.commit()

    return jsonify({"message": "Transaction deleted successfully"}), 200

# Start the server
if __name__ == "__main__":
    # Create users
    user1 = User(username="john_doe", password="password123")
    user2 = User(username="jane_doe", password="letmein")

    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

    # Create transactions
    transaction1 = Transaction(description="Groceries", amount=50.0)
    transaction2 = Transaction(description="Gasoline", amount=30.0)

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.commit()

    # Start the server
    app.run(debug=True)
