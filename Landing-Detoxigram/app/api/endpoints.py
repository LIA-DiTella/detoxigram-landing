from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from api.models.hate_bert_classifier import hate_bert_classifier 
from api.models.mixtral_8x7b_API_classifier import mistral_classifier 
from api.message_obtainer import messages_obtainer
from dotenv import main
import os

main.load_dotenv()

print(os.getcwd())

# Obtener la clave de API de Mistral de las variables de entorno
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASS')

try:
    hatebert = hate_bert_classifier('tomh/toxigen_hatebert', verbosity=True)
    print("Success initializing hatebert classifier")
except Exception as e:
    print(f"Error initializing hatebert classifier: {e}")
    hatebert = None

try:
    mistral = mistral_classifier(
        mistral_api_key=MISTRAL_API_KEY,
        templatetype='prompt_template_few_shot',
        verbosity=True,
        toxicity_distribution_path='api/mistral_distribution.json',
        calculate_toxicity_distribution=False
    )
    print("Success initializing mistral classifier")
except Exception as e:
    print(f"Error initializing mistral classifier: {e}")
    mistral = None

try:
    obtainer = messages_obtainer(USERNAME, PASSWORD)
    obtainer.login()
    print("Success initializing message obtainer")
except Exception as e:
    print(f"Error initializing message obtainer: {e}")
    obtainer = None

router = APIRouter()

class PredictionRequest(BaseModel):
    username: str

class PredictionResponse(BaseModel):
    total_toxicity: int
    most_toxic_message: str
    why_toxicity: str
    detoxified_most_toxic: str

def modelate_toxicity(messages) -> tuple:
    '''
    Requiere: messages, una lista de mensajes
    Modifica: Nada
    Devuelve: Una tupla con dos elementos:
                - toxic_messages, una lista de tuplas con los mensajes tóxicos y su puntuación de toxicidad
                - toxicity_score, la puntuación de toxicidad media de los mensajes tóxicos
    '''
    toxic_messages = []
    try:
        toxicity_score = 0
        if messages:
                for msg in messages:
                    try:
                        toxicity = mistral.predictToxicity(msg)
                        if toxicity[0] == True:
                            contador_toxicos += 1
                            toxicity_score += toxicity[1]
                            toxic_messages.append((msg, toxicity[1]))
                    except:
                        print("Error predicting toxicity")
                        continue
                toxicity_score = toxicity_score / len(toxic_messages)
                return toxic_messages, toxicity_score
    except:
        raise HTTPException(status_code=500, detail=str(e))

def explain_toxicity(messages, toxicity) -> str:
    toxic_messages = [msg[0] for msg in messages]
    output = mistral.explain(toxic_messages, toxicity)
    return output


@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest()):
    '''
    predict() takes an username from the request and returns the total toxicity of the user's tweets
    '''
    username = request.username
    messages = obtainer.get_messages(username)
    toxic_messages, average_toxicity = modelate_toxicity(messages)
    most_toxic_message = max(toxic_messages, key=lambda x: x[1])[0] if toxic_messages else None
    why_toxicity = explain_toxicity(toxic_messages, average_toxicity) 
    detoxify_most_toxic = mistral.detoxify(most_toxic_message)
    return PredictionResponse(total_toxicity=average_toxicity, most_toxic_message=most_toxic_message,why_toxicity=why_toxicity, detoxify_most_toxic=detoxify_most_toxic)


app = FastAPI()
app.include_router(router, prefix="/predict", tags=["predict"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
