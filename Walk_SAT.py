import numpy as np

def iff(a,b):
    if a==False and b==False:
        b=True
    elif a==False and b==True:
        b=True
    elif a==True and b==False:
        b=False
    elif a==True and b==True:
        b=True
    
    return b

def flip(en):
    if en=='1':
        sal='0'
    elif en=='0':
        sal='1'
    return sal

def num2bol(a):
    if a==0:
        sal=False
    elif a==1 or a>1 or a<-1:
        sal=True
    return sal    

def getnumber(number):
        inicio=np.random.rand(1)
        salida=int((number-1)*inicio)
        #print(salida)
        return salida

def WALK_SAT(variables):
    maxi=50
    var=[]
    model=[]
    KB=False
    
    #Obtener el modelo inicial
    n=getnumber(2**variables)
    sal=format(n,'05b')  #Convert to binary (5 elements)
    
    for i in range(0,maxi):
        #sal=format(n,'03b')
        print(sal)
        P11=sal[4]
        P22=sal[3]
        P33=sal[2]
        P44=sal[1]
        P55=sal[0]

        P11=num2bol(int(P11))
        P22=num2bol(int(P22))
        P33=num2bol(int(P33))
        P44=num2bol(int(P44))
        P55=num2bol(int(P55))

        #Knowledge base----------------
        #ratio = m/n = 3/5
        R1=not P33  #Vasrs_C = P33
        R2=P22 and P44 and P55 #Vasrs_C = P22, P44, P55
        R3=P11 or P44 #Vasrs_C = P11, P44
        KB=R1 and R2 and R3
        print('KB = ',KB)
        #------------------------------        
        if KB==True:
            model=[P55, P44, P33, P22, P11]
            var=model
            print("Model successfuly found")
            break
        elif KB==False:
            change_simbol=getnumber(variables)        
            ff=flip(sal[change_simbol]) 
            sal=list(sal)
            sal[change_simbol]=ff
            sal=''.join(sal)
        print("Position: ",5-change_simbol,"   Change to:",ff,"   Final: ",sal)
        print("")
    return sal, var


salida, var = WALK_SAT(5)
print(salida, var)