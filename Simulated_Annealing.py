import numpy as np
import matplotlib.pyplot as plt

def h(x):
    if x<-1 or x>1:
        y=0
    else:
        y=(np.cos(50*x)+np.sin(20*x))
    return y        

hv=np.vectorize(h)

def simple_greedy_search(func,start=0,N=100):
    x=start
    history=[]
    for i in range(N):
        history.append(x)
        u=0.001
        xleft=x-u
        xright=x+u
        yleft=func(xleft)
        yright=func(xright)
        
        if yleft>yright:
            x=xleft
        else:
            x=xright
    return x, history

def Simu_Annealing(vectorX,func,Temperatura=100):
    x=np.random.choice(vectorX)
    u=0.95
    history=[]
    #Temperatura=T_inicial
    for i in range(150):
        xnew=x+np.random.normal()
        
        ##---------------------
        if xnew<-1:
            xnew=-1
        if xnew>2:
            xnew=2
        ##---------------------
        
        dh=func(xnew)-func(x)  #Score of each point by using that point
        
        probabilidad=np.exp(dh/Temperatura)
        #print("probabilidad: ",probabilidad)
        print("dh: ", dh, "probability: ",probabilidad)
        if u<=probabilidad:
            x=xnew
        history.append(x)
        Temperatura=0.9*Temperatura
        #print("Temperatura: ", Temperatura)
    return x, history


X=np.linspace(-1,2,num=3500)
plt.figure()
plt.plot(X,hv(X))

x0, history=simple_greedy_search(hv, start=-0.02, N=100)
plt.figure()
plt.plot(X,hv(X))
plt.scatter(x0,h(x0),marker='x',s=100)
plt.plot(history,hv(history))

mu, sigma = 0, 1 # mean and standard deviation
s = np.random.normal(mu, sigma, 1000)
#print("s",s)
import matplotlib.pyplot as plt
plt.figure()
count, bins, ignored = plt.hist(s, 30, density=True)
plt.plot(bins, 1/(sigma * np.sqrt(2 * np.pi)) *
        np.exp( - (bins - mu)**2 / (2 * sigma**2) ),
        linewidth=2, color='r')

x0, history=Simu_Annealing(X,hv,100)
plt.figure()
plt.plot(X,hv(X))
plt.scatter(x0,h(x0),marker='x',s=100)  #last point
plt.plot(history,hv(history))

# sal=np.column_stack((history, hv(history)))
# sal

plt.show()

