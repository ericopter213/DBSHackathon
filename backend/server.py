from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the MySQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define a Transaction model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)

# Create the database tables
db.create_all()


@app.route('/')
def hello_world():
    return "Hello, World!"


@app.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    new_transaction = Transaction(amount=data['amount'], description=data['description'])

    try:
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({"message": "Transaction created successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500
    finally:
        db.session.close()


@app.route('/transactions', methods=['GET'])
def read_transactions():
    transactions = Transaction.query.all()
    result = [{"id": t.id, "amount": t.amount, "description": t.description} for t in transactions]
    return jsonify(result)


@app.route('/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    data = request.get_json()
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    try:
        transaction.amount = data['amount']
        transaction.description = data['description']
        db.session.commit()
        return jsonify({"message": "Transaction updated successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500
    finally:
        db.session.close()


@app.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    try:
        db.session.delete(transaction)
        db.session.commit()
        return jsonify({"message": "Transaction deleted successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500
    finally:
        db.session.close()


if __name__ == '__main__':
    app.run(debug=True)
