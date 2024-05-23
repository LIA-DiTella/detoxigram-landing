from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import predict as predict_toxicity, PredictionRequest, PredictionResponse

router = APIRouter()

@router.post("/", response_model=PredictionResponse)
def predictToxicity(request: PredictionRequest):
    return predict_toxicity(request)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/predict", tags=["predict"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Toxicity Analysis API"}
