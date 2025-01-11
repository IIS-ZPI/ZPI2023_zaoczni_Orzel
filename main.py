class ArithmeticAdd: # Addition
    def Addition(self, A: float, B: float) -> float:
        return A + B

class ArithmeticDiff:
    def Difference(self, A: float, B: float) -> float:
        return A - B
    
class ArithmeticMulti:
    def Multiplication(self, A: float, B: float) -> float:
        return A * B

class ArithmeticsDivImpl:
    def Division(self, A: float, B: float) -> float:
        try:
            return A / B
        except ZeroDivisionError:
            print("Error: Division   by zero is not allowed.")
            return float('inf')

if __name__ == "__main__":
    print("ORZEL_1 devops JoOhStud")
    print("BartStud") # zad5
    print("Dutchu")
    print("pterq") # komentarz 2
    print("Sebastian Frączak")

    # Example usage
    A = 10
    B = 5

    adder = ArithmeticAdd()
    diff = ArithmeticDiff() # komentarz po1
    multi = ArithmeticMulti()
    diviser = ArithmeticsDivImpl() # komentarz zad6

    # Print example
    print("") # hmm
    print(f"Arithmetic operations for A={A}, B={B}")
    print(f"A + B: {adder.Addition(A, B)}")
    print(f"A - B: {diff.Difference(A, B)}")
    # Multiplication
    print(f"A * B: {multi.Multiplication(A, B)}")
    # Division
    print(f"A / B: {diviser.Division(A, B)}") 
    
    # komentarz 3
