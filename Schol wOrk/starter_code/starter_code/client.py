# Client to implement a simple program to send two prime numbers to a
# server. The server will compute their product and send back to the client.
# If the server-calculated product matches what the client computes, the 
# client will send a 200 OK status code to the server. Otherwise a
# 400 Error code is sent to the server.

# Author: Jordan Brown
# Last modified: 2022-10-08
#!/usr/bin/python3

import socket
import sys

def serverHello():
  """Generates server hello message"""
  status = "100 Hello"
  return status

def PrimeCollect():
  """Accepts a prime number to send to the server"""
  primeNbr = input("Enter a prime number between 127 and 7919")
  return primeNbr

def firstPrimeMsg(prime):
  """Generates the first prime number to send"""
  msg = "110 Prime "+ prime
  return msg

def secondPrimeMsg(prime):
  """Generates the second prime number to send"""
  msg = "112 Prime "+ prime
  return msg
  
def testPrime(p):
  for i in range(2,p//2+1):
    if(p%i==0):  #test if number is divisible
      return False
  return True

# s     = socket
# msg   = message being processed
# state = dictionary containing state variables
def processMsgs(s, msg, state):
  """This function processes messages that are read through the socket. It
     returns a status, which is an integer indicating whether the operation
     was successful."""

  msg = msg.decode() #decode

  print('Server:::>> '+msg) #print server message

  if(msg[:3] == '105' and state[0]==1):   #should only listen when state is 105 Hello
    prime = input('Enter a prime number: ')
    while not testPrime(int(prime)):  #test if number is prime
      prime = input('Enter a valid prime number: ')

    s.send(firstPrimeMsg(prime).encode())  #send encode prime message
    state[1]['firstPrime'] = int(prime)   #store first prime number for client
    return state

  if(msg[:3] == '111' and state[0]==1):   #should only listen when state is 111 Prme Ack
    prime = input('Enter a prime number: ')
    while not testPrime(int(prime)):  #test if number is prime
      prime = input('Enter a valid prime number: ')

    s.send(secondPrimeMsg(prime).encode())  #send encode prime message
    state[1]['secondPrime'] = int(prime)   #store first prime number for client
    return state

  if(msg[:3] == '115' and state[0]==1):   #should only listen when state is 105 Hello
    composite = int(msg[14:])  #get the product computed by the server
    testComposite = state[1]['firstPrime']*state[1]['secondPrime'] #calculate to test from client side

    if(composite == testComposite):
      msg = '200 OK'  # return success message
    else:
      msg = '400 Error' #return error message
    
    s.send(msg.encode()) 
    return [0] #stop listening

  return [0] #send message to close client

def main():
  """Driver function for the project"""
  args = sys.argv

  if len(args) != 3:
    print("Please supply a server address and port.")
    sys.exit()

  serverHost = str(args[1])  #The remote host
  serverPort = int(args[2])  #The port used by the server

  print("Client of Jordan Brown")
  print("""
  The purpose of this program is to collect two prime numbers from the client, and then
  send them to the server. The server will compute their product and send it back to the
  client. If the server-computed product matches the locally computed producted, the
  clientsends the server a 200 OK status code. Otherwise it sends a 400 error status code,
  and then closes the socket to the server.
  """)

  #Add code to initialize the socket
  s = socket.socket(socket.AF_INET,socket.SOCK_STREAM);

  s.connect((serverHost,serverPort))

  msg = serverHello()

  #Add code to send data into the socket
  s.send(msg.encode())

  state = [1,
                {'firstPrime':0,'secondPrime':0}] #state holding state data 

  #Handle the data that is read through the socket by using processMsgs(s, msg, state)
  while state[0] == 1:
    msg = s.recv(1024) #recieve message from server
    state = processMsgs(s,msg,state)

  s.close()
  #Close the socket
if __name__ == "__main__":
    main()
  