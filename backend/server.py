from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# configuring mysql connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root123'
app.config['MYSQL_DB'] = 'task2'

mysql = MySQL(app)
# -----

#for registering
@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(''' SELECT * FROM users ''')
        res = cursor.fetchall()
        cursor.close()
        return jsonify(res)

    if request.method == 'POST':
        res = request.get_json()
        username = res["username"]
        email = res["email"]
        firstname = res["firstname"]
        lastname = res["lastname"]
        password = res["password"]
        usertype = res["usertype"]
        cursor = mysql.connection.cursor()
        cursor.execute(
            ''' INSERT INTO users (username,email,firstname,lastname,password,usertype) VALUES(%s,%s,%s,%s,%s,%s)''', 
            [username, email, firstname, lastname, password, usertype])
        mysql.connection.commit()
        cursor.close()
        return f"Done!!"

#for login
@app.route("/login")
def login():
    if request.args.get('username'):
        username = request.args.get('username')
        cursor = mysql.connection.cursor()
        cursor.execute(
            ''' SELECT password,usertype,username FROM users where username like (%s) ''', [username])
        res = cursor.fetchall()
        cursor.close()
    else:
        email = request.args.get('email')
        cursor = mysql.connection.cursor()
        cursor.execute(
            ''' SELECT password,usertype,email FROM users where email like (%s) ''', [email])
        res = cursor.fetchall()
        cursor.close()
    return jsonify(res)

#checking if user already exists
@app.route("/checkuser")
def checkuser():
    username = request.args.get('username')
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' SELECT username FROM users where username like (%s) ''', [username])
    res = cursor.fetchall()
    cursor.close()
    return jsonify(res)

#checking if email already exists
@app.route("/checkemail")
def checkemail():
    email = request.args.get('email')
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' SELECT email FROM users where email like lower(%s) ''', [email])
    res = cursor.fetchall()
    cursor.close()
    return jsonify(res)

#fetching only users
@app.route("/getusers")
def getusers():
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' SELECT id, username FROM users where usertype like "user" ''')
    res = cursor.fetchall()
    cursor.close()
    return jsonify(res)

#assigning task to the user
@app.route("/addtask", methods=['POST'])
def addtask():
    res = request.get_json()
    title = res["title"] 
    description = res["description"]
    assignto = res["assignto"]
    startdate = res["startdate"] or ''
    enddate = res["enddate"] or ''
    deadline = res["deadline"] or ''
    taskstatus = res["taskstatus"] or ''
    screenshot = res["screenshot"] or ''
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' INSERT INTO tasks (title,description,assignto,startdate,enddate,deadline,taskstatus,screenshot) 
        VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''', 
        [title, description, assignto, startdate, enddate, deadline, taskstatus, screenshot])
    mysql.connection.commit()
    cursor.close()
    return f"Done!!"

#fetching particular users task
@app.route("/getuserdata")
def getuserdata():
    username = request.args.get('username')
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' SELECT * FROM tasks where assignto like (%s) ''', [username])
    res = cursor.fetchall()
    cursor.close()
    return jsonify(res)

#for users to update their work status
@app.route("/updatestatus", methods=['POST'])
def updatestatus():
    res = request.get_json()
    newstatus = res["newstatus"]
    id = res["id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' update tasks set taskstatus = (%s) where id = (%s)''', [newstatus, id]
    )
    mysql.connection.commit()
    cursor.close()
    return f"Done!!"


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
