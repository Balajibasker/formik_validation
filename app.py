from flask import Flask, jsonify, request

import mysql.connector


from flask_cors import CORS

import logging


# Establish MySQL database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="validation"
)

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        # Perform server-side form validations
        username = data['username']
        email = data['email']
        password = data['password']
        gender = data['gender']
        country = data['country']
        mobile_number = data['mobileNumber']
        mobile_code = data['mobileCode']
        app.logger.debug("----- %s", username)
        
        # Insert user data into the database
        cursor = db.cursor()
        sql = "INSERT INTO formik_validation (username, email, password, gender, country, mobile_number) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (username, email, password, gender, country, mobile_code + mobile_number)
        cursor.execute(sql, val)
        db.commit()
        cursor.close()
        # Perform any additional actions after successful login
        print("****",username)
        # Return a success message
        
        return jsonify({'message': 'Successfully Registered'})
    except Exception as e:
        # Return an error message
        return jsonify({'message': 'failed', 'error': str(e)})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000,debug=True)



# import mysql.connector

# # Establish MySQL database connection
# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="password"
# )

# # Create a new database
# cursor = db.cursor()
# cursor.execute("CREATE DATABASE validation")
# cursor.close()

# # Switch to the newly created database
# db.database = "validation"

# # Create a table for storing user data
# cursor = db.cursor()
# table_query = """
# CREATE TABLE formik_validation (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     username VARCHAR(255),
#     email VARCHAR(255),
#     password VARCHAR(255),
#     gender VARCHAR(10),
#     country VARCHAR(255),
#     mobile_number VARCHAR(255)
# )
# """
# cursor.execute(table_query)
# cursor.close()

# # Close the database connection
# db.close()
