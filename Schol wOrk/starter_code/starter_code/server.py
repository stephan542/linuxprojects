# Server to implement a simple program to receive two prime numbers from a
# client. The server will compute their product and send it back to the client.
# If the server-calculated product matches what the client computes, the client
# will send a 200 OK status code to the server. Otherwise a 400 Error code is
# sent to the server.

# Author: Jordan
# Last modified: 2022-10-08
#!/usr/bin/python3

import socket
import sys

def clientHello():
  """Generates client hello message"""
  msg = "105 Hello"
  return msg

def firstPrimeAck():
  """Acknowledges the first prime number"""
  msg = "111 Prime Ack"
  return msg

def secondPrimeAck(state):
  """Acknowledges the second prime number"""
  product = state[1]['firstPrime']*state[1]['secondPrime'] #multiply the first & second prim for dict
  msg = '115 Composite '+ str(product)
  return msg

#s      = socket
#msg    = message being processed
#state  = dictionary containing state variables
def processMsgs(s, msg, state):
  """This function processes messages that are read through the socket. It returns
     a status, which is an integer indicating whether the operation was successful."""
  msg = msg.decode()
  print('Client:::>> '+msg)

  if(msg[:3] == "100" and state[0]==1):  #test if listening and 100 Hello
    s.send(clientHello().encode())
    return state

  if(msg[:3] == "110" and state[0]==1):  #test if listening and 110 Prime
    prime = int(msg[10:])
    state[1]['firstPrime'] = prime  #set first prime number
    s.send(firstPrimeAck().encode()) #send encoded message
    return state

  if(msg[:3] == "112" and state[0]==1):  #test if listening and 112 Prime
    prime = int(msg[10:])
    state[1]['secondPrime'] = prime #set second prime number
    s.send(secondPrimeAck(state).encode())  #send encoded message
    return state

  return [0] #send message to end server

def main():
  """Driver function for the server."""
  args = sys.argv
  if len(args) != 2:
    print ("Please supply a server port.")
    sys.exit()
  HOST = ''              #Symbolic name meaning all available interfaces
  PORT = int(args[1])    #The port on which the server is listening.


  if (PORT < 1023 or PORT > 65535):
    print("Invalid port specified.")
    sys.exit()

  print("Server of Jordan Brown")
  with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:

    # Bind socket
    s.bind((HOST,PORT))

    # listen
    s.listen()

    conn, addr = s.accept()# accept connections using socket
    with conn:
      print("Connected from: ", addr)
      #Process messages received from socket using 
      #  processMsgs(s, msg, state)

      state = [1,
                {'firstPrime':0,'secondPrime':0}] #state holding state data 

      while state[0] == 1:
        msg = conn.recv(1024)  #recive client message
        state = processMsgs(conn,msg,state) #get state after processing message
     
      s.close()
   
      
if __name__ == "__main__":
    main()