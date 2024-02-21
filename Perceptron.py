#Martín Durán Santos-----------------------------------------------------------------------
#PhD Candidate Intelligent Systems (University of the Americas Puebla, Mexico)-------------
#Perceptron Algorithm

import numpy as np
import matplotlib.pyplot as plt
import math as m

m1=-1
m2=-0.1
std1=0.2

x1=np.random.normal(m1,std1,50)
y1=np.random.normal(m1,std1,50)
x2=np.random.normal(m2,std1,50)
y2=np.random.normal(m2,std1,50)

x1=np.reshape(x1, (1, 50))
y1=np.reshape(y1, (1, 50))
x2=np.reshape(x2, (1, 50))
y2=np.reshape(y2, (1, 50))

a=np.ones((1,100))

X=np.concatenate((x1, x2),axis=1) 
Y=np.concatenate((y1, y2),axis=1) 

F=np.concatenate((X.T,Y.T,a.T),axis=1)

Y1=np.ones((1,50))
Y2=np.ones((1,50))*(-1)

Y=np.concatenate((Y1,Y2),axis=1)
#--------------------------------------------------------------------------------------
w0=[2,-1,1] #Initial w vector
eta=0.2 #Initial update factor
#F: feature matrix
#--------------------------------------------------------------------------------------
wx=np.zeros((1,100))
index=[]
Yest=np.zeros((1,100))
dx=[]
iter=10
w=w0
#--------------------------------------------------------------------------------------
for g in range(0,iter):

    wx=np.zeros((1,100))
    index=[]
    Yest=np.zeros((1,100))
    dx=[]

    #plt.figure()
    plt.figure(figsize=(3,3)) 
    plt.scatter(x1, y1, alpha=0.8, c="green", edgecolors='none', s=30, label="Class 1")
    plt.scatter(x2, y2, alpha=0.8, c="blue", edgecolors='none', s=30, label="Class 2")
    plt.title('Perceptron')
    plt.legend(loc=2)
    #plt.show()
    #w=[ -1.21063325,  -0.99709901 , -16.1 ]
      
    x = -w[2] / w[0]
    y = -w[2] / w[1]

    b = y
    m = -y / x

    line_x_coords = np.array([0, 2*x])
    line_y_coords = m * line_x_coords + b

    plt.plot(line_x_coords, line_y_coords)

    plt.plot([-10,10],[0,0],'r--')
    plt.plot([0,0],[10,-10],'r--')

    plt.axis([-3,3,-3,3])
    
#-------------------------------------------------------------------------------------
    for i in range(0,100):
        wx=np.dot(w,F[i,:])
        if wx>0:
            Yest[0,i]=1
        else:
            Yest[0,i]=-1

        if Y[0,i]*Yest[0,i]==-1:
            index.append(i)

        if Y[0,i]-Yest[0,i]==2:
            dx.append(-1)
        if Y[0,i]-Yest[0,i]==-2:
            dx.append(1)

    #print(index)
    l=len(index)
    Fnew=np.zeros((l,3))

    for n in range(0,l):
        Fnew[n,:]=F[index[n],:]

    suma=np.zeros((1,3))
    
    for n in range(0,l):
        suma=suma+Fnew[n,:]*dx[n]

    w=w-eta*suma
    #eta=eta*0.99
    w=w[0]
    
    #print("Iter:",g)
    #print(Fnew)
    print("Errores = ",l)

plt.show()