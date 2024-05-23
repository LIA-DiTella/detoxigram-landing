from models.hate_bert_classifier import hate_bert_classifier 
from models.mixtral_8x7b_API_classifier import mistral_classifier 
from message_obtainer import messages_obtainer
from dotenv import main
import os
import time

#Inicializo las cosas
main.load_dotenv()

print(os.getcwd())

# Obtener la clave de API de Mistral de las variables de entorno
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASS')

obtainer = messages_obtainer(USERNAME, PASSWORD)

hatebert = hate_bert_classifier('tomh/toxigen_hatebert', verbosity=True)
print("Success initializing hatebert classifier")

mistral = mistral_classifier(
        mistral_api_key=MISTRAL_API_KEY,
        templatetype='prompt_template_few_shot',
        verbosity=True,
        toxicity_distribution_path='mistral_distribution.json',
        calculate_toxicity_distribution=False
    )

print("Success initializing mistral classifier")

def predict_toxicity(username):
    print(f"Finding the tweets of {username}...")
    messages = obtainer.get_messages(username)
    toxicity_score = 0
    most_toxic_message = ""
    last_toxicity = 0
    contador_toxicos = 0
    if messages:
        print("Tweets found! Analyzing...")
        # messages = hatebert.filter_toxic_messages(messages)
        # print(f"Found {len(messages)} toxic messages!")
        long = len(messages)
        if long != 0:
            for msg in messages:
                try:
                    toxicity = mistral.predictToxicity(msg)
                    if toxicity[0] == True:
                        contador_toxicos += 1
                        print(toxicity)
                        print(msg)
                        toxicity_score += toxicity[1]
                        print(toxicity_score)
                        last_toxicity = toxicity[1]
                        if toxicity[1] >= last_toxicity:
                            most_toxic_message = str(msg)
                except:
                    print("Error predicting toxicity")
                    continue

            toxicity_score = toxicity_score / contador_toxicos
            if toxicity_score < 1:
               print(f'{username} seems to be a 🟢 Non-toxic account!')
            elif 1 <= toxicity_score < 1.75:
                print(f'{username} seems to be a 🟡 Slightly toxic account!')
            elif 1.75 <= toxicity_score < 2.5:
                print(f'{username} seems to be a 🟠 Moderately toxic account!')
            elif 2.5 <= toxicity_score < 3.5:
                print(f'{username} seems to be a 🔴 Highly toxic account!')
            else:
                print(f'{username} seems to be a 🔴 Extremely toxic account!')
            print(f"and the most toxic message of {username} is: {most_toxic_message}")
        else:
            return print(f"No messages found for {username}")

        print(f'Now I will explain you why I classified {username} like that...')
        output = mistral.explain(messages, toxicity_score)
        print(output)
        return toxicity_score
        


def main():
    user = input("Enter the username of the account you want to analyze: ")
    result= predict_toxicity(user)
    new_input = input("Do you want to analyze another account? (yes/no): ")
    while new_input == "yes":
        user = input("Enter the username of the account you want to analyze: ")
        result = predict_toxicity(user)
        new_input = input("Do you want to analyze another account? (yes/no): ")
    


main()