user = input('add name');

def send_message(name: str):
    message = "Happy Borthday";
    print(f"Hello , {message} {name}")
    
for i in user:
    send_message(user)