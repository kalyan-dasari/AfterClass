from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AfterClass API",
    description="Backend API for the AfterClass student community platform.",
    version="1.0.0"
)

# Configure CORS so the React frontend can communicate with this API
origins = [
    "http://localhost:5173",  # default Vite port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AfterClass API!"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
